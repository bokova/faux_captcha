#!/bin/bash

# Set the source and destination directories
SOURCE_DIR="src/icons"
DEST_DIR="dist/icons"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Flag to track if any images were processed
processed_any_images=false

# Loop through all SVG files in the source directory
for img in "$SOURCE_DIR"/*.svg; do
  # Check if the file exists
  if [[ -f "$img" ]]; then
    # Extract the filename without the path
    filename=$(basename "$img")
    
    # Copy the image to the destination folder
    cp "$img" "$DEST_DIR/$filename"
    
    echo "Copied $filename to $DEST_DIR"
    
    # Set the flag to true
    processed_any_images=true
  fi
done

# Check if no images were processed
if [[ "$processed_any_images" = false ]]; then
  echo "No SVG images found in $SOURCE_DIR"
fi