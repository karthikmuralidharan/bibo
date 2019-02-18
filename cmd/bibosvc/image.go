package main

import (
	"math/rand"
	"net/http"
	"time"
)

// Image represents an image in a pool
type Image struct {
	ID     string `json:"id,omitempty"`
	URL    string `json:"url,omitempty"`
	Width  int    `json:"width,omitempty"`
	Height int    `json:"height,omitempty"`
}

type ImageListResponse struct {
	Images           []Image  `json:"images,omitempty"`
	BreatheInMemory  []string `json:"breatheInMemory,omitempty"`
	BreatheOutMemory []string `json:"breatheOutMemory,omitempty"`
}

func (rd *ImageListResponse) Render(w http.ResponseWriter, r *http.Request) error {
	// Pre-processing before a response is marshalled and sent across the wire
	return nil
}

type imageFetcherFunc func(count int) ([]Image, error)

// ShuffleImages shuffles around images for display
func ShuffleImages(vals []Image) []Image {
	r := rand.New(rand.NewSource(time.Now().Unix()))
	ret := make([]Image, len(vals))
	perm := r.Perm(len(vals))
	for i, randIndex := range perm {
		ret[i] = vals[randIndex]
	}
	return ret
}

// ShuffleString shuffles around images for display
func ShuffleString(vals []string) []string {
	ret := make([]string, len(vals))
	copy(ret, vals)
	rand.Shuffle(len(ret), func(i, j int) {
		ret[i], ret[j] = ret[j], ret[i]
	})
	return ret
}
