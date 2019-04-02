package domain

import (
	"time"

	"github.com/google/uuid"
)

type Metric struct {
	ID              uuid.UUID
	BreatheInCount  int       `json:"breathe_in_count"`
	BreatheOutCount int       `json:"breathe_out_count"`
	SelectionSize   int       `json:"selection_size"`
	Timestamp       time.Time `json:"timestamp"`
	CreatedAt       time.Time `json:"created_at"`
}

type Stats struct {
	TotalParticipants int
}
