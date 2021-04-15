# Library
{
  tryCatch({
    library(devtools)
  }, error = function(e) {
    install.packages("devtools")
    library(devtools)
  })
  
  tryCatch({
    library(iptools)
  }, error = function(e) {
    install.packages("iptools")
    library(iptools)
  })
  
  tryCatch({
    library(fireData)
  }, error = function(e) {
    devtools::install_github("Kohze/fireData")
    library(fireData)
  })

  tryCatch({
    library(httr)
  }, error = function(e) {
    install.packages("httr")
    library(httr)
  })
  
  tryCatch({
    library(googleAuthR)
  }, error = function(e) {
    install.packages("googleAuthR")
    library(googleAuthR)
  })

  tryCatch({
    library(cronR)
  }, error = function(e) {
    install.packages("cronR")
    library(cronR)
  })

  tryCatch({
    library(httpuv)
  }, error = function(e) {
    install.packages("httpuv")
    library(httpuv)
  })

  tryCatch({
    library(stringr)
  }, error = function(e) {
    install.packages("stringr")
    library(stringr)
  })
  tryCatch({
    library(tuber)
  }, error = function(e) {
    install.packages("tuber")
    library(tuber)
  })
  tryCatch({
    library(jsonlite)
  }, error = function(e) {
    install.packages("jsonlite")
    library(jsonlite)
  })
}

#cmd <- cron_rscript('index.R')

#cron_add(cmd, frequency = 'minutely', id = 'crawler_job', description = 'Youtube Crawler Job')

#cron_ls()

#cron_clear(ask=FALSE)
