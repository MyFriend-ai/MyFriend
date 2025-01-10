<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $config = [
        'percentageA' => $_POST['percentageA'],
        'percentageB' => $_POST['percentageB']
    ];
    
    file_put_contents('../data/ab-config.json', json_encode($config, JSON_PRETTY_PRINT));
    header('Location: index.php');
}