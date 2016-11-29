 /**
   * 拼接有用的电影信息
   * @param subjects 获取的所有电影信息
   * return 返回处理后所有电影信息
   */
  function processSubjects(subjects){
      var movies = [] ; //电影信息
      for(var i = 0 ;i < subjects.length;i++){
          var subject = subjects[i];
           var movie = processSubject(subject);
           movies.push(movie);
      }
    return movies;

  };
  /**
   * 处理每一条电影信息
   * @param subject  每一条电影信息
   * return 返回处理后的一天电影信息
   */
  function processSubject(subject){
    var movie = {};
    var title = subject.title; //电影名称
    //导演处理
    var directors = subject.directors;//导演数组
    var directorStr = "";
    for(var index in directors){
        directorStr += directors[index].name+" / "
    }

    if(directorStr!=""){
        directorStr = directorStr.substring(0,directorStr.length-2) ;//去掉最后一个导演后的的　／　斜线
    }
    //演员处理
    var casts = subject.casts;//演员数组
    var castStr = "";
    for(var index in casts){
        castStr += casts[index].name+" / "
    }

    if(castStr!=""){
        castStr = castStr.substring(0,castStr.length-2) ;//去掉最后一个演员后的的　／　斜线
    }
     //电影类型处理
    var genres = subject.genres;//电影类型数组
    var genreStr = "";
    for(var index in genres){
        genreStr += genres[index]+" / "
    }

    if(genreStr!=""){
        genreStr = genreStr.substring(0,genreStr.length-2) ;//去掉最后一个电影类型后的的　／　斜线
    }

    var year = subject.year ; //年份

    //拼显示的字符型
    var text = "名称："+title + "\n导演："+directorStr + "\n主演："+castStr + "\n类型："+ genreStr + "\n上映年份："+year ;

    movie.text = text; //电影信息
    movie.id = subject.id;
    movie.image = subject.images.medium;
    movie.casts = subject.casts; //演员
    movie.summary = subject.summary; //简介

    return movie;
  }

module.exports = {
  processSubjects: processSubjects,
  processSubject: processSubject
}