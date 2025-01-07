<?php
header('Content-Type: application/json');

// Recebe os dados do POST
$data = json_decode(file_get_contents('php://input'), true);
$type = $data['type'];
$variant = $data['variant'];

// Lê o arquivo de tracking
$trackingFile = '../data/tracking.json';
$tracking = json_decode(file_get_contents($trackingFile), true);

// Pega a data de hoje
$today = date('Y-m-d');

// Procura ou cria entrada para hoje
$todayEntry = null;
$found = false;

foreach ($tracking['dailyData'] as &$entry) {
    if ($entry['date'] === $today) {
        $todayEntry = &$entry;
        $found = true;
        break;
    }
}

if (!$found) {
    $newEntry = [
        'date' => $today,
        'totalVisits' => 0,
        'variantA' => [
            'visits' => 0,
            'clicks' => 0,
            'testDescription' => ''
        ],
        'variantB' => [
            'visits' => 0,
            'clicks' => 0,
            'testDescription' => ''
        ]
    ];
    array_unshift($tracking['dailyData'], $newEntry);
    $todayEntry = &$tracking['dailyData'][0];
}

// Atualiza as estatísticas
if ($type === 'visit') {
    $todayEntry['totalVisits']++;
    $todayEntry['variant' . $variant]['visits']++;
} else if ($type === 'click') {
    $todayEntry['variant' . $variant]['clicks']++;
}

// Salva as alterações
file_put_contents($trackingFile, json_encode($tracking, JSON_PRETTY_PRINT));

echo json_encode(['success' => true]);