import os
import datetime

OUTPUT_FILE = "project_summary.md"
EXCLUDED_DIRS = {".git", "node_modules", "venv", "__pycache__", ".idea"}


def generate_markdown(root_dir):
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(f"# Project Summary - {os.path.basename(root_dir)}\n")
        f.write(f"Generated on {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        for root, dirs, files in os.walk(root_dir):
            # Exclude specific directories
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
            relative_root = os.path.relpath(root, root_dir)
            
            if relative_root != ".":
                f.write(f"## Directory: {relative_root}\n\n")
            
            for file in files:
                file_path = os.path.join(root, file)
                f.write(f"### File: {os.path.relpath(file_path, root_dir)}\n\n")
                with open(file_path, "r", encoding="utf-8", errors="ignore") as file_content:
                    code_lines = file_content.readlines()
                    f.write(f"Lines: {len(code_lines)}\n\n")
                    f.write("```\n")
                    f.writelines(code_lines)
                    f.write("```\n\n")
        print(f"✅ Project summary generated: {OUTPUT_FILE}")


generate_markdown(os.getcwd())
