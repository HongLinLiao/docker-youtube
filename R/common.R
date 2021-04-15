# Library
{
  tryCatch({
    library(devtools)
  }, error = function(e) {
    install.packages("devtools")
    library(devtools)
  })
  
  tryCatch({
    library(fireData)
  }, error = function(e) {
    devtools::install_github("Kohze/fireData")
    library(fireData)
  })
  
  tryCatch({
    library(httpuv)
  }, error = function(e) {
    install.packages("httpuv")
    library(httpuv)
  })
  
  tryCatch({
    library(iptools)
  }, error = function(e) {
    install.packages("iptools")
    library(iptools)
  })
}

# Config
{ 
  projectURL <- 'https://test.firebaseio.com'
  google_toke_file = './token.json'
  storage_scope <- 'https://www.googleapis.com/auth/devstorage.read_write'
  youtube_scope <- 'https://www.googleapis.com/auth/youtube'
  bucket_name <- 'test.appspot.com'
}

#' @title common print function
#' @param information message want to record {string}
container_print <- function(information) {
  time <- Sys.time()
  
  message = paste0(paste(
    paste0('Container: ',uniqueIp),
    paste0('Info: ',information),
    paste0('Time: ',time),
    sep = '\n'
  ), '\n')
  
  cat(message)
}

# get ip
if(file.exists("ramdom_ip.txt")){
  uniqueIp <- readLines("ramdom_ip.txt")
} else{
  uniqueIp <- ip_random(1)
  fileConn<-file("ramdom_ip.txt")
  writeLines(c(uniqueIp), fileConn)
  close(fileConn)
}

# get container key
if(file.exists("ramdom_key.txt")){
  uniqueKey <- readLines("ramdom_key.txt")
} else{
  check_exist = FALSE
  container <- fireData::download(projectURL, fileName = "processor")
  if(length(container) > 0){
    for(i in length(container)){
      if(container[[i]] == uniqueIp){
        uniqueKey <- names(container[i])
        check_exist = TRUE
        fileConn<-file("ramdom_key.txt")
        uniqueKey <- gsub("processor/", "", data)
        writeLines(c(uniqueKey), fileConn)
        close(fileConn)
      }
    } 
  }
  if(check_exist == FALSE){
    data <- fireData::upload(uniqueIp,projectURL, directory = "processor")
    fileConn<-file("ramdom_key.txt")
    uniqueKey <- gsub("processor/", "", data)
    writeLines(c(uniqueKey), fileConn)
    close(fileConn)
  }
}