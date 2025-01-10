<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyFriend</title>
    <!-- Google Analytics aqui -->
</head>
<body>
    <script type="module">
        import { routeToVariant } from './landing-pages/router.js';
        
        // Determina qual variante mostrar
        const variant = routeToVariant();
        
        // Redireciona para a landing page correta
        window.location.href = `/landing-pages/funnel-${variant.toLowerCase()}/`;
    </script>
</body>
</html>