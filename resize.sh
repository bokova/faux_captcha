#!/bin/bash

# Set the source and destination directories
SOURCE_DIR="src/images"
DEST_DIR="dist/images"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Flag to track if any images were processed
processed_any_images=false

# Loop through all JPEG files in the source directory
for img in "$SOURCE_DIR"/*.jpg "$SOURCE_DIR"/*.jpeg; do
  # Check if the file exists
  if [[ -f "$img" ]]; then
    # Extract the filename without the path
    filename=$(basename "$img" | tr '[:upper:]' '[:lower:]')
    
    # Resize the image to 150px width, keeping the aspect ratio, and save it in the destination folder
    sips --resampleWidth 150 "$img" --out "$DEST_DIR/$filename"
    
    echo "Resized and saved $filename to $DEST_DIR"
    
    # Set the flag to true
    processed_any_images=true
  fi
done

# Check if no images were processed
if [[ "$processed_any_images" = false ]]; then
  echo "No JPEG images found in $SOURCE_DIR"
fi