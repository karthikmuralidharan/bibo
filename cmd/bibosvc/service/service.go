package main

import (
	"time"

	uuid "github.com/satori/go.uuid"
)

type Service struct {
	repository Repository
}

type CreateMetricRequest struct {
	Metric
}

func (svc *Service) CreateMetric(breatheInCount, breatheOutCount, selectionSize int, timestamp time.Time) error {

	m := Metric{
		ID:              uuid.NewV4(),
		BreatheInCount:  breatheInCount,
		BreatheOutCount: breatheOutCount,
		SelectionSize:   selectionSize,
		CreatedAt:       time.Now().UTC(),
	}

	return svc.repository.Store(m)
}

func (svc *Service) GetStats() (Stats, error) {
	return Stats{}, nil
}
