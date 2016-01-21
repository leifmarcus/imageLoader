# imageLoader for Responsive images
Loading images based on specal data-attributes. This could be used to load bigger images when using responsive images.

# How it works

## Prepare images
the plugin expects image tags to be like:

<pre>
<code>&lt;img src="/source/to/img.jpg" 
	width="300" 
	height="300"
	data-src300="/source/to/300/img.jpg"
	data-src600="/source/to/600/img.jpg"
	data-src900="/source/to/900/img.jpg"
	… /&gt;</code></pre>

or you could use it like this

<pre>
<code>&lt;!-- this is for wrapper with responsive sizes --&gt;
&lt;div class="image"
	data-src300="/source/to/300/img.jpg"
	data-src600="/source/to/600/img.jpg"
	data-src900="/source/to/900/img.jpg"
	&gt;
	&lt;img src="some url" />&gt;
&lt;/div&gt;
</code>
</pre>

or you could use it for background images

<pre><code>&lt;div class="image"
	style="background-image:url('/source/to/image.jpg');"
	data-src300="/source/to/300/img.jpg"
	data-src600="/source/to/600/img.jpg"
	data-src900="/source/to/900/img.jpg"
	…
	&gt;&lt;/div&gt;
</code></pre>

## Javascript

run the script like follows
<pre><code>$('.image').imageLoader({settings})</code></pre>

## settings
settings could setup the plugin to special needs
<pre>
<code>startSize: 300,                 // smallest size
stepSize:  300,                 // steps to go from smallest size
prefix:    'src',               // prefix for data-src300 attributes
imgPath:   '',                  // path that should be prepended
complete:  function(el, src){}  // triggers after new image is loaded
</code></pre>

## Example
Imagine the plugin should load images bigger than 200px (width or height, the biggest counts) and the steps should be 100px. You would render your image like follows:
<pre>
<code>&lt;img class="responsive" src="/img/image.jpg" data-s200="image.jpg" data-s300="image2.jpg" data-s500="image3.jpg" &gt;
</code></pre>

and the javascript like this
<pre>
<code>$('.responsive').imageLoader({
	startSize: 200,
	stepSize: 100	,
	prefix: 's',
	imgPath: '/img/'
});
</code></pre>


