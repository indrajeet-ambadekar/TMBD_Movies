var movieElement = React.createClass({
propTypes: {},

getMoviePoster:function(url){
if(url != null){
var divStyle={
background:'url("https://image.tmdb.org/t/p/w300_and_h450_bestv2'+url+'")',
}
}
else{
var divStyle={
background:'url("images/filmreel.png")'
}
}
return divStyle;
},

getPoster: function(path){
if(path!=null){
return 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+path;
}
else{
return "images/filmreel.png";
}
},

getMovieDetails:function(data){
var index = $(data.target).attr('data-key');
this.props.getMovieDetails(this.props.results[index])
},
addToFav:function(e){
e.preventDefault();
e.stopPropagation();
console.clear();
var index = $(e.target).closest('.movieElement').find('.knowMore').attr('data-key');
this.props.addToFav(this.props.results[index]);
},

render: function () {
var main = this.props;
var movies = main.results;
var buffer=[];
for(var i in movies){
buffer.push(
<div key={i} className='movieElement'>
	<div className="">
		<div className='row'>
			<div className='col-md-4'>
				<img className="poster" src={this.getPoster(movies[i].poster_path)}/>
			</div>
			<div className='col-md-8'>

				<div className='movieTitle'>
					{movies[i].title}
					<year> ({moment(movies[i].release_year).format('YYYY')})</year>
				</div>

				<div className='row'>
					<div className='col-md-1 text-center'>
						<div className="AddFav" title="Add to favourites" data-key={i} onClick={this.addToFav.bind(this)}>
							<i className='fa fa-heart'></i>
						</div>
					</div>
				</div>
				<div className='overview'>
					<h3>Overview</h3>
					{movies[i].overview}
				</div>
				<button className='btn btn-warning knowMore' data-key={i} onClick={this.getMovieDetails.bind(movies[i])}>Know more..</button>

			</div>
		</div>
	</div>
</div>
);
}
return (
<div>
	{buffer}
</div>
);
}

});

moviesApp.value('movieElement', movieElement);
