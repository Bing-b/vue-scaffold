#!/bin/bash
set -e

echo "=== Starting deployment build ==="
pnpm install
pnpm build

echo "=== Build finished successfully ==="
