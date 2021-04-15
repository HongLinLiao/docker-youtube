# Library
{
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

# YouTube API authorization/extract YouTube URL video ID/get video comments/save as JSON
deal_task <- function(link) {
  
  yt_oauth(token = ".httr-oauth")
  
  if (stringr::str_detect(link, '/watch\\?')) {
    rgx = '(?<=\\?v=|&v=)[\\w-]+'
  } else {
    rgx = '(?<=/)[\\w]+/?(?:$|\\?)'
  }
  
  id <- stringr::str_extract(link, rgx)
  comt <- get_all_comments(video_id = id)

  write_json(comt, 'output.json')
}

