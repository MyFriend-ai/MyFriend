<!-- admin/index.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Painel de Testes A/B</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
        .config { margin-bottom: 30px; }
    </style>
</head>
<body>
    <h1>Configuração de Testes A/B</h1>
    
    <div class="config">
        <h2>Distribuição de Tráfego</h2>
        <form method="post" action="update-config.php">
            Página A: <input type="number" name="percentageA" value="<?php echo $config['percentageA']; ?>">%
            Página B: <input type="number" name="percentageB" value="<?php echo $config['percentageB']; ?>">%
            <button type="submit">Atualizar</button>
        </form>
    </div>

    <div class="config">
        <h2>Descrição dos Testes</h2>
        <form method="post" action="update-description.php">
            Página A: <input type="text" name="descriptionA" style="width: 300px;">
            Página B: <input type="text" name="descriptionB" style="width: 300px;">
            <button type="submit">Salvar Descrição</button>
        </form>
    </div>

    <h2>Resultados</h2>
    <table>
        <tr>
            <th>Data</th>
            <th>Total Visitas</th>
            <th>Visitas A</th>
            <th>Clicks A</th>
            <th>Conv. A</th>
            <th>Teste A</th>
            <th>Visitas B</th>
            <th>Clicks B</th>
            <th>Conv. B</th>
            <th>Teste B</th>
        </tr>
        <?php
        $data = json_decode(file_get_contents('../data/tracking.json'), true);
        foreach ($data['dailyData'] as $day) {
            $convA = $day['variantA']['visits'] > 0 ? 
                round(($day['variantA']['clicks'] / $day['variantA']['visits']) * 100, 1) : 0;
            $convB = $day['variantB']['visits'] > 0 ? 
                round(($day['variantB']['clicks'] / $day['variantB']['visits']) * 100, 1) : 0;
            
            echo "<tr>";
            echo "<td>{$day['date']}</td>";
            echo "<td>{$day['totalVisits']}</td>";
            echo "<td>{$day['variantA']['visits']}</td>";
            echo "<td>{$day['variantA']['clicks']}</td>";
            echo "<td>{$convA}%</td>";
            echo "<td>{$day['variantA']['testDescription']}</td>";
            echo "<td>{$day['variantB']['visits']}</td>";
            echo "<td>{$day['variantB']['clicks']}</td>";
            echo "<td>{$convB}%</td>";
            echo "<td>{$day['variantB']['testDescription']}</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>