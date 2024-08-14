#!/bin/bash

# Template file
TEMPLATE_FILE="apps/${APP_NAME}/src/environments/environment.tmpl"

# Output file
OUTPUT_FILE="src/environments/environment.${BUILD_ENV}.ts"

# Check if template file exists
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "Error: Template file $TEMPLATE_FILE does not exist."
    exit 1
fi

# Copy template to output file
cp "$TEMPLATE_FILE" "$OUTPUT_FILE"

# Function to replace placeholders with environment variables
replace_env_vars() {
    local file=$1
    local temp_file="${file}.tmp"

    # Create a temporary file
    cp "$file" "$temp_file"

    # Loop through all environment variables
    while IFS='=' read -r name value ; do
        # Skip variables that start with underscore
        [[ $name != ENV_* ]] && continue

        # Perform the replacement
        sed -i.bak "s|\${${name}}|${!$name}|g" "$temp_file"
    done < <(env)

    # Move the temporary file back to the original
    mv "$temp_file" "$file"

    # Remove backup files
    rm -f "${file}.bak" "${temp_file}.bak"
}

# Replace environment variables in the output file
replace_env_vars "$OUTPUT_FILE"

echo "Environment file $OUTPUT_FILE generated successfully."
