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
}

#' @title Get container will deal task
#' @return c(taskUser, taskKey, pendingTask, taskLink)
get_task <- function() {
  
  # Get Data List
  pending_source <- download(projectURL, fileName = paste0("pending/",uniqueKey))
  task_source <- download(projectURL, fileName = "task")
  
  container_print(paste0('Pending length: ', length(pending_source)))
  
  if(length(pending_source) != 0){
    
    targetKey <- NULL
    targetUser <- NULL
    targetTask <- NULL
    targetLink <- NULL
    
    # search pending
    for(i in 1:length(pending_source)){
      currentTask <- NULL
      currentUser <- NULL
      currentTaskKey <- names(pending_source[i])

      # all user task
      for(j in 1:length(task_source)){
        # a user all task
        userTask <- names(task_source[[j]])
        # get task instance
        if(length(grep(currentTaskKey, userTask)) == 0){
          next
        }
        else{
          currentUser <- names(task_source[j])
          currentTask <- task_source[[j]][currentTaskKey]
          break
        }
      }
      
      if(is.null(currentTask)){
        # delete error data
        container_print(paste0('Delete not exist task in pending: ', currentTaskKey))
        fireData::delete(x = pending_source[currentTaskKey],projectURL, directory=paste0("pending/",currentTaskKey))
      }else if(currentTask[[1]]['processor'] == uniqueIp){
        # this container is dealing data
        container_print(paste0('Container is still dealing data: ', currentTaskKey))
        break
      }
      else if(currentTask[[1]]['state'] == '已完成'){
        container_print(paste0('Delete complete task in pending: ', currentTaskKey))
        fireData::delete(x = pending_source[currentTaskKey],projectURL, directory=paste0("pending/",currentTaskKey))
      }else{
        targetUser <- currentUser
        targetKey <- currentTaskKey
        targetTask <- pending_source[currentTaskKey]
        targetLink <- currentTask[[1]]['url']
        break
      }
    }
    
    if(!is.null(targetUser) && !is.null(targetKey) && !is.null(targetTask)){
      container_print(paste0('Target task: ', targetKey))
      return (c(targetUser, targetKey, targetTask, targetLink))
    }else{
      return (NULL)
    }

  }
  else{
    return (NULL)
  }
  
}

#' @title delete pending
#' @param taskKey delete task key {string}
#' @param instance delete instance {list}
delete_pending <- function(taskKey, instance){
  fireData::delete(x = instance, projectURL, directory=paste0('pending/',uniqueKey, '/', taskKey))
}

#' @title delete pending
#' @param uid user id {string}
#' @param taskKey task key {string}
#' @param data update data {list}
edit_task <- function(data, uid, taskKey){
  fireData::patch(x=data, projectURL, directory=paste0('task/',uid,'/',taskKey))
}

#' @title upload data
#' @param taskKey task key {string}
upload_json <- function(taskKey){

  bucket_name = bucket_name
  object_name = paste0('output/', taskKey, '/output.json')
  file_path = './output.json'

  google_token <- gar_auth_service(google_toke_file,scope = storage_scope)

  upload_url <-
    paste0(
      'https://www.googleapis.com/upload/storage/v1/b/',
      bucket_name,
      '/o?uploadType=media&name=',
      object_name,
      '&predefinedAcl=',
      'publicRead'
    )
  
  headers <- c("Authorization" = paste("Bearer", google_token$credentials$access_token))
  
  if (is.null(file_path)) {
    response <- httr::POST(url = upload_url,
                           add_headers(
                             headers
                           ))
  } else {
    response <- httr::POST(
      url = upload_url,
      body = upload_file(file_path),
      add_headers(
        headers
      )
    )
  }
  
  data <- httr::content(response)
  data['url'] <- paste('https://storage.cloud.google.com', bucket_name, object_name, sep = '/')

}
