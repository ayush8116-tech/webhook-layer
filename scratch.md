# PLAN

## requirements

webhook server (deploy with docker)
system server (run on local in shell with node)
github webhook attached on the working repo with webhook(deployed) server link 
webhook for workflow event only

## flow

user will push
request some in webhook server (deployed in render with docker (deno))
webhook server will ping the request with workflow-conclusion to system server which will be open with node in shell (no need to deploy system server)
system server will get conclusion as payload and send the signal to arduino according to that