#!/bin/bash

# Function to generate CNAME file
generate_cname() {
  echo "Generating CNAME file..."
  echo "sena.web.id" > ./docs/CNAME
  echo "CNAME file created at ./docs/CNAME"
}

# Execute the function
generate_cname
