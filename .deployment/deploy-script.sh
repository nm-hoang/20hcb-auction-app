# Auto deploy for Online Auction Market project
# Contributed by ductbui
#
# Version: 1.0.0
#
# Description
#

REPO="git@github.com:daniel-ducbui/auction-auth-gateway.git"
API="20hcb-auction-gateway"
API_IMAGE_NAME="api-auction-gateway"
API_IMAGE="20hcb-auction-gateway_api:latest"

if [ -d $API ]; then
  echo "Source exists"

  cd $API

  echo "Undo all changes"
  git status
  git stash
  git stash clear
  echo "Cleared"

  git checkout dev # Just make sure
  git pull origin dev
else
  echo "Getting new source..."
  git clone $REPO $API

  echo "Clone completed"
  cd $API

  echo "Using dev"
  git checkout dev
fi

echo "Run test"
echo "Installing dependencies..."
npm install

echo "Run lint"
npm run lint

echo "Clean up"
rm -rf node_modules

echo "Setup environment"
echo "Copying .env..."
cp ./.deployment/.env.staging .env

echo "Stop all images if exists"
docker-compose down

echo "Remove old image"
docker rmi $API_IMAGE

echo "Build and run new one"
docker-compose up --build -d

echo "Deployment successfully"
