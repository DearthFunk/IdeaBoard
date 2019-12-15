<?php

// db connection info
    $ideaBoard_host = 'localhost';
    $ideaBoard_user = 'joeDirt';
    $ideaBoard_pass = 'abc123';
    $ideaBoard_name = 'ideaboarddb';
    $dbConnect = mysqli_connect($ideaBoard_host, $ideaBoard_user, $ideaBoard_pass, $ideaBoard_name) or die ("db connection failed");
    $getQuery = isset($_GET["get"]) ? $_GET["get"] : false;
    $boardId = isset($_GET["boardId"]) ? $_GET["boardId"] : false;
    $ideaId = isset($_GET["ideaId"]) ? $_GET["ideaId"] : false;



// actual sql statements
    switch ($getQuery) {
        case 'teams': $sql_statement = "SELECT * FROM teams WHERE isDeleted = 0"; break;
        case 'locVotingMechanics': $sql_statement = "SELECT * FROM locVotingMechanics"; break;
        case 'accountInfo': $sql_statement = "SELECT * FROM accountinfo"; break;
        case 'users': $sql_statement = "SELECT * FROM users WHERE isDeleted = 0"; break;
        case 'votingMechanics': $sql_statement = "SELECT * FROM votingmechanics WHERE isDeleted = 0"; break;
        case 'boards': $sql_statement = "SELECT * FROM boards WHERE isDeleted = 0"; break;
        case 'ideas': $sql_statement = "SELECT * FROM ideas WHERE boardId = ".$boardId." AND isDeleted = 0"; break;
        case 'comments': $sql_statement = "SELECT * FROM comments WHERE ideaId = ".$ideaId." AND isDeleted = 0"; break;
        case 'recycleBin': $sql_statement = "SELECT name,deletedBy,deletedOn FROM boards,users WHERE isDeleted = 1"; break;
        default: $sql_statement = false;
    }

// actual query and display
    if ($sql_statement) {
        $qry = mysqli_query($dbConnect, $sql_statement);
        $rows = array();
        while($r = mysqli_fetch_assoc($qry)) {
            $rows[] = $r;
        }
        echo json_encode($rows, JSON_NUMERIC_CHECK);
    }
    else {
        echo "invalid query: ".$getQuery;
    }


?>