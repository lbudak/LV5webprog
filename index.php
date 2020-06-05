<?php
require 'ferit.database.php';

$db = new Database("db", "ferit", "user", "test");
$db->Connect();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadatak 1</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
</head>
<body>
    <section class="container d-flex flex-column  align-items-center mb-4">
        <h1>CFC 3</h1>
        <h2>Choose your cat</h2>
    </section>
    <div class="container d-flex flex-column  align-items-center">
        <div id="clock" class="clock display-4"></div>
        <div id="message" class="message"></div>
    </div>
    <div class="row">
        <div id="firstSide" class="container d-flex flex-column  align-items-center side first-side col-5">
            <div class="row d-flex justify-content-end">
                <div class="col-auto">
                    <ul class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins:<span class="wins"></span> Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto featured-cat-fighter">
                    <img class="featured-cat-fighter-image img-rounded" width="300" height="300" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div class="row fighter-list">
                       <?php
                            $results = $db->Read("SELECT * FROM cats");
                            if(mysqli_num_rows($results) > 0):
                            while($row = mysqli_fetch_assoc($results)):
                       ?>
                       <div class="col-md-4 mb-1">
                            <div class="fighter-box"
                            data-info = '{
                                "id": <?=$row["id"]?>,
                                "name": "<?=$row["name"]?>" ,
                                "age" : <?=$row["age"]?>,
                                "catInfo": "<?=$row["info"]?>",
                                "record" : {
                                    "wins":  <?=$row["wins"]?>,
                                    "loss": <?=$row["loss"]?>
                                }
                            }'
                            >
                            
                            <?php echo '<img src="' . $row['image'] . '" alt="Figter Box 1" width="150" height="150">' ?>
                            </div>
                            <form method="get" action="update.old.php">
                                <button type="submit" name="idEdit" value="<?=$row["id"]?>" class="btn btn-outline-secondary" style="margin-top: 5px; margin-left: 50%">Edit</button> 
                            </form>
                        </div>
                        <?php endwhile; endif;?>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2 d-flex flex-column align-items-center">
            <p class="display-4">VS</p>
            <button id="generateFight" class="btn btn-primary mb-4 btn-lg">Fight</button>
            <button id="randomFight" class="btn btn-secondary">Select Random fighters</button>
            <br><button id="newFighter" class="btn btn-light btn-sm" onClick="parent.location='add.new.php'">Add new fighter</button>
        </div>
        <div id="secondSide" class="container d-flex flex-column align-items-center side second-side col-5">
            <div class="row">
                <div class="col-auto featured-cat-fighter">
                    <img class="featured-cat-fighter-image img-rounded" width="300" height="300" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto">
                    <ul class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins: <span class="wins"></span>Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div class="row fighter-list">
                    <?php
                            $results = $db->Read("SELECT * FROM cats");
                            if(mysqli_num_rows($results) > 0):
                            while($row = mysqli_fetch_assoc($results)):
                       ?>
                       <div class="col-md-4 mb-1">
                            <div class="fighter-box"
                            data-info = '{
                                "id": <?=$row["id"]?>,
                                "name": "<?=$row["name"]?>" ,
                                "age" : <?=$row["age"]?>,
                                "catInfo": "<?=$row["info"]?>",
                                "record" : {
                                    "wins":  <?=$row["wins"]?>,
                                    "loss": <?=$row["loss"]?>
                                }
                            }'
                            >
                            
                            <?php echo '<img src="' . $row['image'] . '" alt="Figter Box 1" width="150" height="150">' ?>
                            </div>
                            <form method="get" action="update.old.php">
                                <button type="submit" name="idEdit" value="<?=$row["id"]?>" class="btn btn-outline-secondary" style="margin-top: 5px; margin-left: 50%">Edit</button> 
                            </form>
                        </div>
                        <?php endwhile; endif;?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php 
        $db->CloseConnection();
    ?>
    <script src="./src/app.js"></script>
</body>
</html>
