#!/usr/bin/env python3
"""
Script to update .env file with OPENAI_API_KEY
"""
import os
import sys

def update_env_file():
    # Read current .env file
    try:
        with open('.env', 'r') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print("Error: .env file not found")
        return False
    
    # Check if OPENAI_API_KEY is already in the file
    openai_key_exists = any(line.startswith('OPENAI_API_KEY=') for line in lines)
    
    if not openai_key_exists:
        # Ask for the API key
        api_key = input("Enter your OpenAI API key (starts with 'sk-'): ")
        
        # Add the API key to the .env file
        with open('.env', 'a') as f:
            f.write(f"\n# OpenAI API Key for ChatGPT integration\nOPENAI_API_KEY={api_key}\n")
        
        print("Updated .env file with OPENAI_API_KEY")
        return True
    else:
        print("OPENAI_API_KEY already exists in .env file")
        return False

if __name__ == "__main__":
    update_env_file() 