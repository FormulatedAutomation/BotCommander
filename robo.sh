curl \
--request POST \
--header "robocloud-process-secret: 36713df0406fc23629cee8f324a7323b" \
--header "Content-Type: application/json" \
--data "{\"variables\": {\"workItemKey\":\"workItemValue\"}}" \
"https://api.eu1.robocloud.eu/workspace-v1/workspaces/971988d2-33d9-4cdf-acd4-2d7f7b64814e/processes/0acf110e-5160-43f4-a82c-9c1b5a2472dc/runs"
