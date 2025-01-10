<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tracking = json_decode(file_get_contents('../data/tracking.json'), true);
    $today = date('Y-m-d');
    
    // Atualiza ou cria entrada para hoje
    $updated = false;
    foreach ($tracking['dailyData'] as &$day) {
        if ($day['date'] === $today) {
            $day['variantA']['testDescription'] = $_POST['descriptionA'];
            $day['variantB']['testDescription'] = $_POST['descriptionB'];
            $updated = true;
            break;
        }
    }
    
    if (!$updated) {
        array_unshift($tracking['dailyData'], [
            'date' => $today,
            'totalVisits' => 0,
            'variantA' => [
                'visits' => 0,
                'clicks' => 0,
                'testDescription' => $_POST['descriptionA']
            ],
            'variantB' => [
                'visits' => 0,
                'clicks' => 0,
                'testDescription' => $_POST['descriptionB']
            ]
        ]);
    }
    
    file_put_contents('../data/tracking.json', json_encode($tracking, JSON_PRETTY_PRINT));
    header('Location: index.php');
}