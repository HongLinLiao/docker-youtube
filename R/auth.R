# Library
{
  tryCatch({
    library(devtools)
  }, error = function(e) {
    install.packages("devtools")
    library(devtools)
  })

  tryCatch({
    library(httr)
  }, error = function(e) {
    install.packages("httr")
    library(httr)
  })
}

client_id <- 'Your Client ID'
client_secret <- 'Your Client Secret'

scope = match.arg(
  'ssl',
  c("ssl", "basic", "own_account_readonly",
    "upload_and_manage_own_videos",
    "partner_audit",
    "partner"))

scope_url = switch(
  scope,
  ssl = "https://www.googleapis.com/auth/youtube.force-ssl",
  basic = "https://www.googleapis.com/auth/youtube",
  own_account_readonly = "https://www.googleapis.com/auth/youtube.readonly",
  upload_and_manage_own_videos ="https://www.googleapis.com/auth/youtube.upload",
  partner_audit = "https://www.googleapis.com/auth/youtubepartner-channel-audit",
  partner =  "https://www.googleapis.com/auth/youtubepartner"
)

myapp <- oauth_app("google", key = client_id, secret = client_secret)

httr::oauth2.0_token(oauth_endpoints("google"), myapp, scope = scope_url)
