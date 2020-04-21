#!/bin/bash

if [ "$BRANCH" != "master" ];
then
	echo "Start Building Storybook"
	npm run build-storybook
else
	echo "Storybook will not be built for production branch ($BRANCH)"
fi

echo "Starting Build"
npm run build:static || exit 1

if [ -n "$NETLIFY_ASSET_PATH" ];
then
  echo "Copying assets to deployment path"
  mkdir -p out$NETLIFY_ASSET_PATH && mv out/_next out$NETLIFY_ASSET_PATH/_next && mv out/static out$NETLIFY_ASSET_PATH/static
else
  echo "Leaving assets in original paths"
fi