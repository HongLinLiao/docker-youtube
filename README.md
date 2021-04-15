#Docker Hands-on
> Key Words: Docker、R、React、Firebase(Authentication、Realtime Database、Storage)
## What?
This project is for Chang Gung University Cloud System class docker mini-project.
There are two container: Nginx react application server、R computing server
React container record youtube video url in firebase realtime database.
R computing container get the url by user id and task id and calling google to get youtube comment as JSON file storing in firebase Storage.

## How?
1. Create Firebase Project and start Youtube API service in Google Cloud Platform API 
2. Replace react website firebase config in `web/src/firebase.js`.
3. Replace firebase project url and storage bucket name in `R/common.R`
4. Add firebase project token file `token.json` in R folder
5. You need to run `auth.R` file to generate `.httr-oauth` file 
6. Run `docker build` building docker image.
7. Run `docker push` pushing image to registry.
8. In server, run `docker pull` to get the two image.
9. Run `docker run -it -d 'image name'` to running nginx server.
10. Run `docker run -it -d 'image name' /bin/bash -c "service cron start && bash"` to run computing container.
> Computing container like a queue system, and running cron job to check if any task is dealing every minute.
If the before task are not end, the next task will be pending in queue util the before task finish.

###More Information in `info.pdf` 