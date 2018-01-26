var movieGridElement = React.createClass({
propTypes: {},

render: function () {
var movie = this.props;
if(movie.poster_path != null){
var divStyle={
background:'url("https://image.tmdb.org/t/p/w185_and_h278_bestv2'+movie.poster_path+'")',
}
}
else{
var divStyle={
background:'url("images/filmreel.png")'
}
}
return (
<div className="col-md-4 movieGrid" style={divStyle}>
<div className="movieGridTitleBG"></div>
<div className='movieGridTitle'>{movie.title}</div>
</div>
);
}

});

moviesApp.value('movieGridElement', movieGridElement);
