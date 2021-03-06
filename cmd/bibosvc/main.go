package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	"github.com/karthikmuralidharan/bibo/cmd/bibosvc/unsplash"
	"github.com/karthikmuralidharan/bibo/cmd/bibosvc/domain/image"

	cache "github.com/patrickmn/go-cache"
	"github.com/spf13/pflag"
)

func main() {
	rand.Seed(time.Now().UTC().UnixNano())

	var (
		clientID       = pflag.String("unsplash.client_id", "", "client id for accessing unsplash public APIs")
		fetchCount     = pflag.Int("img_count", 20, "count of images to fetch")
		selectionCount = pflag.Int("selection_count", 5, "count items to remember")
		// postgresURL    = pflag.String("postgres_url", "postgresql://postgres:postgres@localhost:5432", "connection to the postgres database")
	)

	pflag.Parse()

	fetchImages := unsplash.ImageFetcher(*clientID)

	// Create a cache with a default expiration time of 5 minutes, and which
	// purges expired items every 10 minutes
	c := cache.New(2*time.Minute, 5*time.Minute)

	randomImageFunc := func() ([]image.Image, error) {
		const cacheKey = "random_images"
		res, found := c.Get(cacheKey)
		if found {
			fmt.Println("cache hit")
			images := res.([]image.Image)
			shuffled := image.ShuffleImages(images)
			return shuffled, nil
		}

		images, err := fetchImages(*fetchCount)
		if err != nil {
			return nil, err
		}
		c.Set(cacheKey, images, cache.DefaultExpiration)
		shuffled := image.ShuffleImages(images)
		return shuffled, nil
	}

	r := chi.NewRouter()
	// A good base middleware stack
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(render.SetContentType(render.ContentTypeJSON))

	r.Get("/images/random", func(w http.ResponseWriter, r *http.Request) {
		images, err := randomImageFunc()
		if err != nil {
			render.Render(w, r, ErrRender(err))
			return
		}

		var imageURLs []string
		for _, img := range images {
			imageURLs = append(imageURLs, img.URL)
		}

		var breatheInSelection []string
		{
			breatheInSelection = image.ShuffleString(imageURLs)
			breatheInSelection = breatheInSelection[:*selectionCount]
		}

		var breatheOutSelection []string
		{
			breatheOutSelection = image.ShuffleString(imageURLs)
			breatheOutSelection = breatheOutSelection[:*selectionCount]
		}

		resp := &image.ImageList{
			Images:           images,
			BreatheInMemory:  breatheInSelection,
			BreatheOutMemory: breatheOutSelection,
		}

		render.Render(w, r, resp)
	})

	serveStatic(r)
	http.ListenAndServe(":8080", r)
}

func serveStatic(r chi.Router) {
	workDir, _ := os.Getwd()
	filesDir := filepath.Join(workDir, "dist")

	FileServer(r, "/", http.Dir(filesDir))
}

//--
// Error response payloads & renderers
//--

// ErrResponse renderer type for handling all sorts of errors.
//
// In the best case scenario, the excellent github.com/pkg/errors package
// helps reveal information on the error, setting it on Err, and in the Render()
// method, using it to set the application-specific error code in AppCode.
type ErrResponse struct {
	Err            error `json:"-"` // low-level runtime error
	HTTPStatusCode int   `json:"-"` // http response status code

	StatusText string `json:"status"`          // user-level status message
	AppCode    int64  `json:"code,omitempty"`  // application-specific error code
	ErrorText  string `json:"error,omitempty"` // application-level error message, for debugging
}

func (e *ErrResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

// ErrRender renders an error from the system
func ErrRender(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 422,
		StatusText:     "Error rendering response.",
		ErrorText:      err.Error(),
	}
}

// FileServer conveniently sets up a http.FileServer handler to serve
// static files from a http.FileSystem.
func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit URL parameters.")
	}

	fs := http.StripPrefix(path, http.FileServer(root))

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	}))
}
