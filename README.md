# liveChat


# Docker Command
# Setup on local
1. Intstall Docker Desktop 
2. Create Dockerfile in the root of directory
4. Open the Docker Desktop
3. Run Cmd:  `docker build -t .`
# docker run -p <hostPort>:<containerPort> image-name
 | Part            | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `-p`            | Publish a port (map it to your host)                                       |
| `hostPort`      | The port on **your computer** (where you’ll connect via browser/cURL/etc.) |
| `containerPort` | The port your **app is listening to inside the container**                 |
| `image-name`    | The name of the Docker image to run                                        |

4. docker run -p 3000:3000 'your image name' # using this command you can publish container images to the browser
# Node app runs inside Docker and listens on port 3000 
