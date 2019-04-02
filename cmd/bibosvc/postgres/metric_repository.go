package main

import (
	"github.com/etherlabsio/errors"
	"github.com/go-pg/pg"
	"guthub.com/karthikmuralidharan/bibo/cmd/bibosvc/domain/metric"
)

type Repository struct {
	db *pg.DB
}

func (store *Repository) Setup() error {
	queries := []string{
		`-- Setting timezone to UTC
SET TIME ZONE 'UTC';
`,
		`-- We need this extension to generate UUIDS from the database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`,
		`CREATE TABLE IF NOT EXISTS "public"."metrics" (
	"id" uuid DEFAULT uuid_generate_v1mc(),
	"breathe_in_count" int DEFAULT 0,
	"breathe_out_count" int DEFAULT 0,
	"selection_size" int DEFAULT 0,
	"timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	PRIMARY KEY ("id")
);`,
		`COMMENT ON TABLE "public"."metrics" IS 'Metrics storing individual survey scores';`,
	}

	for _, query := range queries {
		_, err := store.db.Exec(query)
		if err != nil {
			return err
		}
	}
	return nil
}

func (store *Repository) Store(r metric.Metric) error {
	_, err := store.db.Model(&r).Insert()
	return errors.WithMessage(err, "insert metric failure")
}
