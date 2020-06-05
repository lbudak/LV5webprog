<?php
	require 'picture.php';

	$filecount = countPng();
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	
	<h2>CFC 3 - ADD NEW FIGHTER</h2>

	
	<form method="post" action="update.php">

		<div class="input-group">
			<label>Name</label>
			<input type="text" name="name" value="">
		</div>
		<div class="input-group">
			<label>Age</label>
			<input type="number" name="age" step="0.1" min="0" value="">
		</div>
		<div class="input-group">
			<label>Cat info</label>
			<input type="text" name="info" size="100" value="">
		</div>
		<div class="input-group">
			<label>Win</label>
			<input type="number" min="0" name="wins" value="">
		</div>
        <div class="input-group">
			<label>Loss</label>
			<input type="number" min="0" name="loss" value=""> 
		</div>
        <br>
        <div>
			<label>Cat image</label>
			<select name="cats">
				<?php
					for($i = 1; $i <= $filecount; $i++):
				?>
					<option value="./img/cat<?=$i?>.png">cat<?=$i?></option>
				<?endfor;?>
			 </select>
        </div>
        <br>
        <button type="submit" class="btn">Create</button> 
	</form>
    <br>
    <p>
		<a href="index.php"> <- Go back</a>
	</p>
</body>
</html>