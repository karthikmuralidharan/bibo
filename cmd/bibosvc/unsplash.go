package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/pkg/errors"
)

type unsplashImage struct {
	ID          string      `json:"id"`
	CreatedAt   string      `json:"created_at"`
	UpdatedAt   string      `json:"updated_at"`
	Width       int         `json:"width"`
	Height      int         `json:"height"`
	Color       string      `json:"color"`
	Description interface{} `json:"description"`
	Urls        struct {
		Raw     string `json:"raw"`
		Full    string `json:"full"`
		Regular string `json:"regular"`
		Small   string `json:"small"`
		Thumb   string `json:"thumb"`
		Custom  string `json:"custom"`
	} `json:"urls"`
	Links struct {
		Self             string `json:"self"`
		HTML             string `json:"html"`
		Download         string `json:"download"`
		DownloadLocation string `json:"download_location"`
	} `json:"links"`
	Categories             []interface{} `json:"categories"`
	Sponsored              bool          `json:"sponsored"`
	SponsoredBy            interface{}   `json:"sponsored_by"`
	SponsoredImpressionsID interface{}   `json:"sponsored_impressions_id"`
	Likes                  int           `json:"likes"`
	LikedByUser            bool          `json:"liked_by_user"`
	CurrentUserCollections []interface{} `json:"current_user_collections"`
	Slug                   interface{}   `json:"slug"`
	User                   struct {
		ID              string      `json:"id"`
		UpdatedAt       string      `json:"updated_at"`
		Username        string      `json:"username"`
		Name            string      `json:"name"`
		FirstName       string      `json:"first_name"`
		LastName        string      `json:"last_name"`
		TwitterUsername string      `json:"twitter_username"`
		PortfolioURL    interface{} `json:"portfolio_url"`
		Bio             string      `json:"bio"`
		Location        string      `json:"location"`
		Links           struct {
			Self      string `json:"self"`
			HTML      string `json:"html"`
			Photos    string `json:"photos"`
			Likes     string `json:"likes"`
			Portfolio string `json:"portfolio"`
			Following string `json:"following"`
			Followers string `json:"followers"`
		} `json:"links"`
		ProfileImage struct {
			Small  string `json:"small"`
			Medium string `json:"medium"`
			Large  string `json:"large"`
		} `json:"profile_image"`
		InstagramUsername string `json:"instagram_username"`
		TotalCollections  int    `json:"total_collections"`
		TotalLikes        int    `json:"total_likes"`
		TotalPhotos       int    `json:"total_photos"`
		AcceptedTos       bool   `json:"accepted_tos"`
	} `json:"user"`
	Exif struct {
		Make         string `json:"make"`
		Model        string `json:"model"`
		ExposureTime string `json:"exposure_time"`
		Aperture     string `json:"aperture"`
		FocalLength  string `json:"focal_length"`
		Iso          int    `json:"iso"`
	} `json:"exif"`
	Location struct {
		Title    string `json:"title"`
		Name     string `json:"name"`
		City     string `json:"city"`
		Country  string `json:"country"`
		Position struct {
			Latitude  float64 `json:"latitude"`
			Longitude float64 `json:"longitude"`
		} `json:"position"`
	} `json:"location,omitempty"`
	Views     int `json:"views"`
	Downloads int `json:"downloads"`
}

func UnsplashImageFetcher(clientID string) imageFetcherFunc {

	fetchRandomImages := func(count int) ([]Image, error) {
		url := "https://api.unsplash.com/photos/random?client_id=" + clientID + "&w=400&h=400&orientation=squarish&count=" + strconv.Itoa(count)
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			return nil, err
		}
		res, err := http.DefaultClient.Do(req)
		if err != nil {
			return nil, err
		}
		defer res.Body.Close()

		var resp []unsplashImage

		b, err := ioutil.ReadAll(res.Body)
		if err != nil {
			return nil, err
		}
		err = json.Unmarshal(b, &resp)
		if err != nil {
			return nil, errors.WithMessage(err, "decoding unsplash response")
		}

		var images []Image
		for _, unsplashImg := range resp {
			img := Image{
				ID:     unsplashImg.ID,
				Width:  400,
				Height: 400,
				URL:    unsplashImg.Urls.Custom,
			}
			images = append(images, img)
		}
		return images, nil
	}

	return fetchRandomImages
}
