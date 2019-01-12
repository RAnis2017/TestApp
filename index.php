<?php
use ReallySimpleJWT\Token;
use \Psr\Http\Message\ResponseInterface as Response;


// $allowed_domains = [
//     'http://www.maaclab.com'
// ];
//
// if (in_array($origin, $allowed_domains)) {
//     header('Access-Control-Allow-Origin: ' . $origin);
// }

require '../vendor/autoload.php';
require '../src/config/db.php';
require 'src/Token.php';
use \Psr\Http\Message\ServerRequestInterface as Request;

$app = new \Slim\App;

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->post('/workouts/addworkoutgroup', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $position = $request->getParam('position');

    $sql = "INSERT INTO workouts_group (`name`,`position`) VALUES (:name,:position)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':position', $position);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Workout Group Added"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . $request->getParam('name') . '}}';
    }

    return $response;
});

function save_base64_image($base64_image_string, $output_file_without_extension, $path_with_end_slash = "")
{
    //usage:  if( substr( $img_src, 0, 5 ) === "data:" ) {  $filename=save_base64_image($base64_image_string, $output_file_without_extentnion, getcwd() . "/application/assets/pins/$user_id/"); }
    //
    //data is like:    data:image/png;base64,asdfasdfasdf
    $splited = explode(',', substr($base64_image_string, 5), 2);
    $mime = $splited[0];
    $data = $splited[1];

    $mime_split_without_base64 = explode(';', $mime, 2);
    $mime_split = explode('/', $mime_split_without_base64[0], 2);
    if (count($mime_split) == 2) {
        $extension = $mime_split[1];
        if ($extension == 'jpeg') {
            $extension = 'jpg';
        }

        //if($extension=='javascript')$extension='js';
        //if($extension=='text')$extension='txt';
        $output_file_with_extension = $output_file_without_extension . '.' . $extension;
    }
    file_put_contents($path_with_end_slash . $output_file_with_extension, base64_decode($data));
    return $output_file_with_extension;
}
function randomKey($length)
{
    $pool = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'));
    $key = "";
    for ($i = 0; $i < $length; $i++) {
        $key .= $pool[mt_rand(0, count($pool) - 1)];
    }
    return $key;
}

//
//
//  LOGIN AND SIGNUP CODE BELOW
//
//

$app->post('/signup', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $initialObj = json_encode($data['obj']);
    $email = $data['obj']['email'];
    $password = $data['obj']['password'];
    $nullObj = json_encode([]);
    $sql = "INSERT INTO users (`email`,`password`,`obj`,`coursesObj`) VALUES (:email,:password,:obj,:cObj)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':obj', $initialObj);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':cObj', $nullObj);
        $stmt->execute();
        $id = $db->lastInsertId();

        $db = null;
        $startDate = time();

        $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

        $token = Token::getToken('' . $id, 'se12!@2s23!=eT423*&', $date, 'razaanis');

        echo '{"notice": {"text": "User Added"}, "token": "' . $token . '"}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});


$app->post('/login', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $email = $data['obj']['email'];
    $password = $data['obj']['password'];
    $sql = "SELECT * FROM users WHERE email=:email AND password=:password";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($user);
        $decoded = json_decode($data, true);

        $startDate = time();
        $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

        $token = Token::getToken('' . $decoded[0]['id'], 'se12!@2s23!=eT423*&', $date, 'razaanis');
        echo '{"notice": {"text": "User Logged In"}, "id": ' . $decoded[0]['id'] . ', "success": "1", "user": ' . $data . ', "courses": '. $decoded[0]['coursesObj'] .' ,"token":"' . $token . '"}';

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }
    return $response;
});

$app->post('/authenticate', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);

    $token = $data['token'];

    $result = Token::validate($token, 'se12!@2s23!=eT423*&');
    if ($result) {
        $result = Token::getPayload($token);
        $data = json_decode($result, true);
        $sql = "SELECT * FROM users WHERE id=" . $data['user_id'];
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->query($sql);
            $user = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            $data = json_encode($user);
            $decoded = json_decode($data, true);

            $startDate = time();
            $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

            $token = Token::getToken('' . $decoded[0]['id'], 'se12!@2s23!=eT423*&', $date, 'razaanis');
            echo '{"notice": {"text": "User Authenticated"}, "success": "1", "user": ' . $data . ', "courses": '. $decoded[0]['coursesObj'] .'}';

        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }

    } else {
        echo '{"notice": {"text": "User Not Authenticated"}, "success": "0"}';
    }
    return $response;
});
//
//
//  LOGIN AND SIGNUP CODE ABOVE
//
//

$app->post('/saveUserState', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $user = json_encode($data['user']);
    $courses = json_encode($data['courses']);
    $token = $data['token'];
    $result = Token::validate($token, 'se12!@2s23!=eT423*&');
    if ($result) {
        $result = Token::getPayload($token);
        $data = json_decode($result, true);
        $sql = "UPDATE users SET
            `obj`=:obj, `coursesObj`=:cObj WHERE id=" . $data['user_id'];
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':obj', $user);
            $stmt->bindParam(':cObj', $courses);
            $stmt->execute();

            $db = null;

            echo '{"notice": {"text": "User State Saved"}}';
        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }

    } else {
        echo '{"notice": {"text": "User Not Authenticated"}, "success": "0"}';
    }

    return $response;
});

$app->get('/getMinCourses', function (Request $request, Response $response, array $args) {

    $sql = "SELECT id,objMin FROM courses";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($data);
        $startDate = time();
        $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

        echo $data;

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});

$app->get('/getUsersList', function (Request $request, Response $response, array $args) {

    $sql = "SELECT id, obj FROM users";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($data);
        $startDate = time();
        $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

        echo '{"notice": {"text": "User List Retrieved"}, "success": "1", "users": ' . $data . '}';

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});

$app->post('/coursesBought', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $ids = $data['ids'];
    $completeids = $data['completeids'];
    $token = $data['token'];
    $allCourses = $data['courses'];
    $courseIds = substr($data['ids'], 0, -1);
    $courses = json_encode([]);
    if(strlen($courseIds) > 0){
      $sql = "SELECT id,objFull FROM courses WHERE id IN ($courseIds)";
      try {
          $db = new db();
          $db = $db->connect();
          $stmt = $db->query($sql);
          $dataC = $stmt->fetchAll(PDO::FETCH_OBJ);
          $db = null;
          foreach ($dataC as $course) {
            array_push($allCourses, $course);
          }
          $courses = json_encode($allCourses);
          $startDate = time();
          $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));


      } catch (PDOException $e) {
          echo '{"error":{"text": ' . $e->getMessage() . '}}';
      }
    }
    $result = Token::validate($token, 'se12!@2s23!=eT423*&');

    if ($result) {
        $result = Token::getPayload($token);
        $data = json_decode($result, true);
        $sql = "UPDATE users SET
            `courses`=:courses, `coursesObj`=:cObj WHERE id=" . $data['user_id'];
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':courses', $completeids);
            $stmt->bindParam(':cObj', $courses);
            $stmt->execute();

            $db = null;

            echo '{"notice": {"text": "User Courses Bought"}}';
        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }

    } else {
        echo '{"notice": {"text": "User Courses Not Bought"}, "success": "0"}';
    }



    return $response;
});

$app->post('/saveSetting', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $initialObj = json_encode($data['obj']);
    $email = $data['obj']['email'];
    $password = md5($data['obj']['password']);
    $token = $data['token'];
    $result = Token::validate($token, 'se12!@2s23!=eT423*&');
    if ($result) {
        $result = Token::getPayload($token);
        $data = json_decode($result, true);
        $sql = "UPDATE users SET
            `email`=:email,
            `password`=:password,
            `obj`=:obj WHERE id=" . $data['user_id'];
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':obj', $initialObj);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->execute();

            $db = null;

            echo '{"notice": {"text": "User Updated"}}';
        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }

    } else {
        echo '{"notice": {"text": "User Not Authenticated"}, "success": "0"}';
    }



    return $response;
});



$app->get('/trainers/getAllWhere/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $result = true;
    if ($result) {
      $sql = "SELECT * FROM users WHERE type=1 AND id=$id";
      try {
          $db = new db();
          $db = $db->connect();
          $stmt = $db->query($sql);
          $user = $stmt->fetchAll(PDO::FETCH_OBJ);
          $db = null;
          $data = json_encode($user);
          echo '{"notice": {"text": "Trainers Retrieved"}, "success": "1", "user": ' . $data . '}';

      } catch (PDOException $e) {
          echo '{"error":{"text": ' . $e->getMessage() . '}}';
      }
    } else {
      echo '{"error":{"text": "You are not allowed to access this api endpoint"}}';
    }

    return $response;
});


$app->delete('/deleteuser/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "DELETE FROM users
            WHERE id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $workoutsg = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo '{"notice": {"text": "Trainer Deleted"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

  return $response;
});

$app->put('/recipes/updaterecipe', function (Request $request, Response $response, array $args) {
    $id = $request->getParam('id');
    $name = $request->getParam('name');
    $short = $request->getParam('short');
    $description = $request->getParam('description');
    $time = $request->getParam('time');
    $carbs = $request->getParam('carbs');
    $proteins = $request->getParam('proteins');
    $fats = $request->getParam('fat');
    $servings = $request->getParam('servings');
    $ingredients = $request->getParam('ingredients');
    $directions = $request->getParam('directions');

    $image = $request->getParam('image');
    if (strlen($image)>26) {
    $image = save_base64_image($image, randomKey(20), '../../newman/public/recipes/');
    }
    $directionspics = json_decode($directions, true);
        for($idx = 0; $idx < count($directionspics); $idx++){
            $objtpictures = (Array)$directionspics[$idx]['image'];

            if (strlen($directionspics[$idx]['image'])>26) {
                $directionspics[$idx]['image'] = save_base64_image($directionspics[$idx]['image'], randomKey(20), '../../newman/public/recipes/');
            }
        }
        $directionspics = json_encode($directionspics);

    $sql = "INSERT INTO recipes (`name`,`short`,`description`,`time`,`carbs`,`proteins`,`fats`,`servings`,`ingredients`,`directions`,`image`) VALUES
    (:name,:short,:description,:time,:carbs,:proteins,:fats,:servings,:ingredients,:directions,:image)";
    $sql = "UPDATE recipes SET
    `name` = :name,
    `short` = :short,
    `description` = :description,
    `time` = :time,
    `carbs` = :carbs,
    `proteins` = :proteins,
    `fats` = :fats,
    `servings` = :servings,
    `ingredients` = :ingredients,
    `directions` = :directions,
    `image` = :image
WHERE id = $id";

    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':short', $short);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':time', $time);
        $stmt->bindParam(':carbs', $carbs);
        $stmt->bindParam(':proteins', $proteins);
        $stmt->bindParam(':fats', $fats);
        $stmt->bindParam(':servings', $servings);
        $stmt->bindParam(':ingredients', $ingredients);
        $stmt->bindParam(':directions', $directionspics);
        $stmt->bindParam(':image', $image);

        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Recipe Updated"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});

$app->run();
