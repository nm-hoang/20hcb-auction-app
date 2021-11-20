echo "Updating server..."
sudo apt update

echo "Installing docker..."
sudo apt install docker.io

echo "Installing docker compose..."
sudo apt install docker-compose

echo "Installing NodeJS..."
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Installing NPM..."
sudo apt install npm

echo "Testing..."
node -v
npm -v
docker ps
docker-compose