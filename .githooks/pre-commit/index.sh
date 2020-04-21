#!/bin/bash
#
# Run lint fixer for any changed files in stage area by running npm run lint:fix test for each commit.
# 
# If you want to commit code without running lint:fix, add the flag (--no-verify) to the commit command
# eg: git commit -m "Message" --no-verify
#

PATCH_FILE="working-tree.patch"

# This function will handle applying back any temporarily removed changes (in the uncommitted files) to the working tree after
# we finish running lint:fix
function cleanup {
    exit_code=$?
    if [ -f "$PATCH_FILE" ]; then
        git apply "$PATCH_FILE" 2> /dev/null
        rm "$PATCH_FILE"
    fi
    exit $exit_code
}

# This trap command will run cleanup() function after exiting shell command. The exit will be triggered when one
# of these signals is received:  SIGINT (interrupt - 2) or SIGNHUP (clean/tidy up - 1)
# The trap command is commonly used to run cleanup tasks
trap cleanup EXIT SIGINT SIGHUP

# If we want to run lint:fix on the staged files only, we temporarily remove all uncommited changes and save the difference
# in the patch_file. The changes will later be applied when running cleanup() function trigged by the 'trap' command.
# If you want to run lint:fix on all files (including non-staged file), comment out the two lines below, and
# the `trap cleanup EXIT SIGINT SIGHUP` line
git diff > "$PATCH_FILE"
git checkout -- .

# Work flow:
# 1- Check if there are any changed files.
# 2- if so, run npm lint. If the lint exists with no errors, continue the commit
# 3- else, run npm lint:fix, then
# 4- git add any files that were changed with the lint, then commit

# get changed files 
git_cached_files=$(git diff --cached --name-only --diff-filter=ACMR)

if [ "$git_cached_files" ]; then
  if npm run lint:fix; then
    git add $git_cached_files
  else 
    echo "ERROR: There were lint errors when running lint:fix. Check your lint logs"
    exit 1
  fi
fi