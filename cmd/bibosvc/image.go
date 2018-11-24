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
