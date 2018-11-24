package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	cache "github.com/patrickmn/go-cache"
	"github.com/spf13/pflag"
)

// Image represents an image in a pool
type Image struct {
	ID     string `json:"id,omitempty"`
	URL    string `json:"url,omitempty"`
	Width  int    `json:"width,omitempty"`
	Height int    `json:"height,omitempty"`
}

type ImageListResponse struct {
	Images []Image `json:"images,omitempty"`
}

func (rd *ImageListResponse) Render(w http.ResponseWriter, r *http.Request) error {
	// Pre-processing before a response is marshalled and sent across the wire
	return nil
}

type imageFetcherFunc func(count int) ([]Image, error)

// Shuffle shuffles around images for display
func Shuffle(vals []Image) []Image {
	r := rand.New(rand.NewSource(time.Now().Unix()))
	ret := make([]Image, len(vals))
	perm := r.Perm(len(vals))
	for i, randIndex := range perm {
		ret[i] = vals[randIndex]
	}
	return ret
}

func main() {

	var (
		clientID   = pflag.String("unsplash.client_id", "", "client id for accessing unsplash public APIs")
		fetchCount = pflag.Int("img_count", 20, "count of images to fetch")
	)

	pflag.Parse()

	var fetchImages imageFetcherFunc
	{
		fetchImages = UnsplashImageFetcher(*clientID)
	}

	// Create a cache with a default expiration time of 5 minutes, and which
	// purges expired items every 10 minutes
	c := cache.New(2*time.Minute, 5*time.Minute)

	randomImageFunc := func() ([]Image, error) {
		const cacheKey = "random_images"
		res, found := c.Get(cacheKey)
		if found {
			fmt.Println("cache hit")
			images := res.([]Image)
			shuffled := Shuffle(images)
			return shuffled, nil
		}

		images, err := fetchImages(*fetchCount)
		if err != nil {
			return nil, err
		}
		c.Set(cacheKey, images, cache.DefaultExpiration)
		shuffled := Shuffle(images)
		return shuffled, nil
	}

	r := chi.NewRouter()
	// A good base middleware stack
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(render.SetContentType(render.ContentTypeJSON))

	r.Get("/images.random", func(w http.ResponseWriter, r *http.Request) {
		images, err := randomImageFunc()
		if err != nil {
			render.Render(w, r, ErrRender(err))
			return
		}
		resp := &ImageListResponse{Images: images}
		render.Render(w, r, resp)
	})
	http.ListenAndServe(":3000", r)
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

func ErrRender(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 422,
		StatusText:     "Error rendering response.",
		ErrorText:      err.Error(),
	}
}
