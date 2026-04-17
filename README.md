# Shortlink

This repository contains the frontend and supporting files for Shortlink — a small URL shortener service. The service splits responsibilities between a frontend (this project) and a backend implemented in Go. The backend project lives in the short-url-go repository (see the Backend section below).

## Summary

Shortlink provides a simple UI to create, manage, and redirect shortened URLs. This README explains how the pieces fit together, how to run the frontend locally, and where to find and run the backend (short-url-go).

## Features

- Create short URLs that redirect to long URLs
- List and manage existing short links
- Simple analytics / redirect counting (backend-dependent)
- Lightweight SPA that calls the Go backend API

## Architecture

- Frontend: This repository — UI, static assets, build scripts
- Backend: short-url-go — REST API written in Go with chi that handles creation, storage and redirection of short URLs

The frontend calls the backend API endpoints to perform actions (create, list, redirect). All persistence and business logic lives in the Go backend.

## Backend (short-url-go)

The backend implementation is maintained in a separate repository named `short-url-go`. That repository contains the Go server, database migrations, configuration and API documentation. Clone or view it here:

https://github.com/gewall/short-url-go

Follow the README in that repository to install and run the Go backend. Typical steps include setting up environment variables.

## Prerequisites

- Node.js (14+) / npm or yarn — to build and run the frontend
- Access to a running instance of the short-url-go backend (local or remote)

## Configuration (frontend)

The frontend needs to know the backend API base URL. Configure it via environment variable or config file depending on the project's conventions. Example environment variable:

- REACT_APP_API_BASE_URL or VITE_API_BASE_URL — set to something like `http://localhost:8080/api` or to your production backend URL.

Make sure the backend is running and that CORS is configured on the backend to allow requests from the frontend origin.
