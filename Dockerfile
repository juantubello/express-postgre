FROM --platform=amd64 node:16

# Create app directory
WORKDIR /usr/src/app

#create necessary folder and copy all the required files
RUN mkdir -p ./resources

COPY index.js .
COPY package.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]