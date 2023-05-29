INSERT INTO questions(id, text)
  VALUES (1, '¿Cuáles de los siguientes NO se describen en la configuración (templates) de Cloudformation?'),
(2, '¿Cuál de los siguientes enunciados es verdadero'),
(3, '¿Cuál de los siguientes NO es una característica de serverless computing?'),
(4, '¿Cuál de los siguientes enunciados NO es cierto sobre Serverless Stack (SST)?'),
(5, '¿Cuál de los siguientes servicios de AWS es un proveedor de identidad?'),
(6, '¿Cómo se cobra en AWS Lambda?'),
(7, '¿Cuál de las siguientes NO es una opción válida para guardar el estado en una aplicación serverless?'),
(8, '¿Con qué librería se implementó la conexión de frontend con backend para esta app?');

INSERT INTO options(id, question_id, text, is_right)
  VALUES (1, 1, 'La estructura y relaciones entre recursos de AWS', FALSE),
(2, 1, 'El código fuente de una aplicación', TRUE),
(3, 1, 'Los parámetros de seguridad', FALSE),
(4, 1, 'La secuencia de pasos para desplegar', FALSE),
(5, 2, 'CDK solo puede generar CloudFormation templates en JSON.', FALSE),
(6, 2, 'CloudFormation templates no admite el uso de lenguajes de programación para definir la infraestructura.', TRUE),
(7, 2, 'CDK no permite la reutilización de código en diferentes proyectos.', FALSE),
(8, 2, 'CloudFormation templates no permite generar todos los recursos que sí permite CDK', FALSE),
(9, 3, 'Escalabilidad automática', FALSE),
(10, 3, 'Reducción de costos por uso', FALSE),
(11, 3, 'Sin administración de servidores', FALSE),
(12, 3, 'Stateful', TRUE),
(13, 4, 'Tiene constructs que extienden el Cloud Development Kit los cuales implementan funcionalidades de más alto nivel', FALSE),
(14, 4, 'Facilita el desarrollo local al emular toda la infraestructura de AWS', TRUE),
(15, 4, 'Permite la administración de los componentes a través de una consola web', FALSE),
(16, 4, 'Habiita al despliegue completo de una aplicación de forma replicable y sencilla', FALSE),
(17, 5, 'Cognito', TRUE),
(18, 5, 'Lambda', FALSE),
(19, 5, 'CloudFront', FALSE),
(20, 5, 'Api Gateway', FALSE),
(21, 6, 'Por la cantidad de tiempo que los servidores están encendidos', FALSE),
(22, 6, 'Por la cantidad de almacenamiento utilizado', FALSE),
(23, 6, 'Por la cantidad de veces que se ejecuta el código y la duración de la ejecución', TRUE),
(24, 6, 'Por la cantidad de usuarios que utiliza el servicio', FALSE),
(25, 7, 'Almacenar estado en una base de datos como AWS DynamoDB', FALSE),
(26, 7, 'Almacenar estado en un sistema de almacenamiento de objetos como AWS S3', FALSE),
(27, 7, 'Almacenar estado en AWS Elasticache', FALSE),
(28, 7, 'Almacenar estado en el sistema de archivos local de la función Lambda', TRUE),
(29, 8, 'Axios', FALSE),
(30, 8, 'AWS SDK', FALSE),
(31, 8, 'AWS Amplify Framework', TRUE),
(32, 8, 'AWS CDK', FALSE);

SELECT
  q.text AS pregunta,
  o.text AS respuesta
FROM
  questions q
  JOIN options o ON q.id = o.question_id
WHERE
  is_right = TRUE;

-- ¿Cuáles de los siguientes NO se describen en la configuración (templates) de Cloudformation?
-- 1. La estructura y relaciones entre recursos de AWS
-- 2. El código fuente de una aplicación
-- 3. Los parámetros de seguridad
-- 4. La secuencia de pasos para desplegar
-- ¿Cuál de los siguientes enunciados es verdadero?
-- 1. CDK solo puede generar CloudFormation templates en JSON.
-- 2. CloudFormation templates no admite el uso de lenguajes de programación para definir la infraestructura.
-- 3. CDK no permite la reutilización de código en diferentes proyectos.
-- 4. CloudFormation templates no permite generar todos los recursos que sí permite CDK
-- ¿Cuál de los siguientes NO es una característica de serverless computing?
-- 1.  Stateful
-- 2. Escalabilidad automática
-- 3. Reducción de costos por uso
-- 4. Sin administración de servidores
-- ¿Cuál de los siguientes enunciados NO es cierto sobre Serverless Stack (SST)?
-- Tiene constructs que extienden el Cloud Development Kit los cuales implementan funcionalidades de más alto nivel.
-- Facilita el desarrollo local al emular toda la infraestructura de AWS.
-- Permite la administración de los componentes a través de una consola web.
-- Habiita al despliegue completo de una aplicación de forma replicable y sencilla.
-- ¿Cuál de los siguientes servicios de AWS es un proveedor de identidad?
-- Cognito
-- Lambda
-- CloudFront
-- Api Gateway
-- ¿Cómo se cobra en AWS Lambda?
-- Por la cantidad de tiempo que los servidores están encendidos
-- Por la cantidad de almacenamiento utilizado
--  Por la cantidad de veces que se ejecuta el código y la duración de la ejecución
-- Por la cantidad de usuarios que utiliza el servicio
-- ¿Cuál de las siguientes no es una opción válida para guardar el estado en una aplicación serverless?
-- Almacenar estado en una base de datos como AWS DynamoDB
-- Almacenar estado en un sistema de almacenamiento de objetos como AWS S3
-- Almacenar estado en AWS Elasticache
-- Almacenar estado en el sistema de archivos local de la función Lambda
-- ¿Con qué librería se implementó la conexión de frontend con backend para esta app?
-- Axios
-- AWS SDK
-- AWS Amplify Framework
-- AWS CDK
