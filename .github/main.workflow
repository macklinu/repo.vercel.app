workflow "Validate" {
  on = "pull_request"
  resolves = ["test"]
}

action "install" {
  uses = "docker://cypress/base:10"
  runs = "yarn"
}

action "lint" {
  uses = "docker://cypress/base:10"
  needs = ["install"]
  runs = "yarn"
  args = "lint"
}

action "test" {
  uses = "docker://cypress/base:10"
  needs = ["lint"]
  runs = "yarn"
  args = "test"
}
