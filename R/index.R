setwd("/usr/src/app")

source('common.R')
source('task.R')
source('youtube.R')

# get task
task <- get_task()

if(!is.null(task)){
  
  # set container running
  update_data <- list('state' = '處理中', 'processor' = uniqueIp)
  edit_task(update_data, task[[1]], task[[2]])
  
  # deal task
  deal_task(task[[4]])
  Sys.sleep(10)
  
  # upload json to storage
  upload_json(task[[2]])
  
  # set finish task data
  update_data <- list('state' = '已完成')
  edit_task(update_data, task[[1]], task[[2]])
  
  # delete task
  delete_pending(task[[2]], task[3])
  
  # delete output data
  unlink("output.json")
  
}