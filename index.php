<?php
use ReallySimpleJWT\Token;
use \Psr\Http\Message\ResponseInterface as Response;
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
    $name = $data['obj']['name'];
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
        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions

        $db = null;
        $startDate = time();

        $date = date('Y-m-d H:i:s', strtotime('+30 day', $startDate));

        $token = Token::getToken('' . $id, 'se12!@2s23!=eT423*&', $date, 'razaanis');
        try {
          $mail->isHTML(true);
          // $mail->isSMTP();
          $mail->SMTPDebug = 4;
          $mail->Host = 'smtp.gmail.com';
          $mail->SMTPAuth = true;
          $mail->SMTPSecure= "tls";
          $mail->Username = "genesishextester@gmail.com";
          $mail->Password = "genesishexdevs";
          $mail->Port = 587;
          //Recipients
          $mail->setFrom('genesishextester@gmail.com', 'Genesis Hex Devs');
          $mail->addAddress($email);     // Add a recipient

          //Content
          $mail->isHTML(true);                                  // Set email format to HTML
          $mail->Subject = 'Email Confirmation';
          $mail->Body    = '<h3>Hi, <strong>'.$name.'!</strong></h3> <b>You have signed up for our website using this email. If it was you please follow the link below to confirm. Or simply ignore this message.</b><hr><a href="http://www.genesishexdevs.com/vinodkatrelaapi/public/confirm-email/'.$token.'">http://genesishexdevs.com/vinodkatrelaapi/public/confirm-email/'.$token.'</a>';

          $mail->send();
          echo '{"notice": {"text": "User Added"}, "token": "' . $token . '"}';
        } catch (Exception $e) {
            echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});

$app->post('/forgotpass', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $initialObj = json_encode($data['obj']);
    $email = $data['obj']['email'];
    $nullObj = json_encode([]);
    $sql = "SELECT * FROM users WHERE `email`=:email";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        if(count($user) > 0){
          $data = json_encode($user);
          $decoded = json_decode($data, true);

          $mail = new PHPMailer(true);                              // Passing `true` enables exceptions

          $db = null;
          $startDate = time();
          $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

          $token = Token::getToken('' . $decoded[0]['id'], 'se12!@2s23!=eT423*&', $date, 'razaanis');
          try {
            $mail->isHTML(true);
            // $mail->isSMTP();
            $mail->SMTPDebug = 4;
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure= "tls";
            $mail->Username = "genesishextester@gmail.com";
            $mail->Password = "genesishexdevs";
            $mail->Port = 587;
            //Recipients
            $mail->setFrom('genesishextester@gmail.com', 'Genesis Hex Devs');
            $mail->addAddress($email);     // Add a recipient

            //Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Email Password Recovery';
            $mail->Body    = '<h3>Hi,</h3> <b>You have requeted for a password reset. If it was you please follow the link below to confirm. Or simply ignore this message.</b><hr><a href="http://www.genesishexdevs.com/password-reset/'.$token.'">http://www.genesishexdevs.com/password-reset/'.$token.'</a>';

            $mail->send();
            echo '{"notice": {"text": "Confirmation Email Sent"}, "token": "' . $token . '"}';
          } catch (Exception $e) {
              echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
          }        } else {
          echo '{"notice": {"text": "No Email Present Like that"}, "success": "0"}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});

$app->post('/resetPassword', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $initialObj = json_encode($data['obj']);
    $password = md5($data['obj']['password']);
    $token = $data['token'];
    $result = Token::validate($token, 'se12!@2s23!=eT423*&');
    if ($result) {
        $result = Token::getPayload($token);
        $data = json_decode($result, true);
        $sql = "UPDATE users SET
            `password`=:password WHERE id=" . $data['user_id'];
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->prepare($sql);
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

$app->post('/login', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $email = $data['obj']['email'];
    $password = $data['obj']['password'];
    $sql = "SELECT * FROM users WHERE email=:email AND password=:password AND email_confirmed <> 0";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        if(count($user) > 0){
          $data = json_encode($user);
          $decoded = json_decode($data, true);

          $startDate = time();
          $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

          $token = Token::getToken('' . $decoded[0]['id'], 'se12!@2s23!=eT423*&', $date, 'razaanis');
          echo '{"notice": {"text": "User Logged In"}, "id": ' . $decoded[0]['id'] . ', "success": "1", "user": ' . $data . ', "role": ' . $decoded[0]['role'] . ', "courses": '. $decoded[0]['coursesObj'] .' ,"token":"' . $token . '"}';
        } else {
          echo '{"notice": {"text": "User Not Logged In"}, "success": "0"}';
        }
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
            echo '{"notice": {"text": "User Authenticated"}, "success": "1", "user": ' . $data . ', "role": ' . $decoded[0]['role'] . ', "courses": '. $decoded[0]['coursesObj'] .'}';

        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }

    } else {
        echo '{"notice": {"text": "User Not Authenticated"}, "success": "0"}';
    }
    return $response;
});


$app->get('/confirm-email/{token}', function (Request $request, Response $response, array $args) {
    $token = $request->getAttribute('token');

    $result = Token::validate($token, 'se12!@2s23!=eT423*&');
    if ($result) {
        $result = Token::getPayload($token);
        $data = json_decode($result, true);
        $sql = "UPDATE users SET
            `email_confirmed`=1 WHERE id=" . $data['user_id'];
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->query($sql);
            $stmt->execute();
            $db = null;
            echo '<h3>Your Email is Authorized you can go to this page and login</h3> <a href="http://genesishexdevs.com/">http://genesishexdevs.com/</a>';

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

$app->get('/adminCourses', function (Request $request, Response $response, array $args) {

    $sql = "SELECT * FROM courses";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $courses = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($courses);

        echo '{"notice": {"text": "All Admin Courses"}, "success": "1", "data": ' . $data . '}';

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});

$app->post('/convertFile', function (Request $request, Response $response, array $args) {
    $uploadedFiles = $request->getUploadedFiles();
    $csv= file_get_contents($uploadedFiles['file']->file);
    $array = array_map("str_getcsv", explode("\n", $csv));
    $json = json_encode($array);

    echo '{"notice": {"text": "File Converted"}, "success": "1", "data": '.$json.' }';

    return $response;
});

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

$app->post('/saveCourse', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $objMin = json_encode($data['objMin']);
    $objFull = json_encode($data['objFull']);

    $sql = "INSERT INTO courses (`objMin`,`objFull`) VALUES (:objMin,:objFull)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':objMin', $objMin);
        $stmt->bindParam(':objFull', $objFull);
        $stmt->execute();
        $id = $db->lastInsertId();

        $db = null;

        echo '{"notice": {"text": "Course Added"}, "success": "1"}';

    } catch (PDOException $e) {
      echo '{"notice": {"text": "Course Not Added"}, "success": "0"}';
    }

    return $response;
});

$app->post('/savePost', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $postTitle = $data['post']['title'];
    $postDescription = $data['post']['description'];

    $sql = "INSERT INTO posts (`title`,`description`) VALUES (:title,:description)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':title', $postTitle);
        $stmt->bindParam(':description', $postDescription);
        $stmt->execute();

        $db = null;
        $sql = "SELECT * FROM posts";
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            $data = json_encode($data);

            $db = null;

            echo '{"notice": {"text": "Post Added"}, "success": "1", "posts": '.$data.'}';

        } catch (PDOException $e) {
          echo '{"notice": {"text": "Post Not Added"}, "success": "0"}';
        }
    } catch (PDOException $e) {
      echo '{"notice": {"text": "Post Not Added"}, "success": "0"}';
    }

    return $response;
});

$app->get('/getPosts', function (Request $request, Response $response, array $args) {

    $sql = "SELECT * FROM posts";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($data);

        $db = null;

        echo '{"notice": {"text": "Posts Retrieved"}, "success": "1", "posts": '.$data.'}';

    } catch (PDOException $e) {
      echo '{"notice": {"text": "Posts Not Retrieved"}, "success": "0"}';
    }

    return $response;
});

$app->post('/deletePost', function (Request $request, Response $response, array $args) {
  $id = $request->getParam('id');
  $sql = "DELETE FROM posts WHERE `id`=:id";
  try {
      $db = new db();
      $db = $db->connect();
      $stmt = $db->prepare($sql);
      $stmt->bindParam(':id', $id);
      $stmt->execute();

      $db = null;
      $sql = "SELECT * FROM posts";
      try {
          $db = new db();
          $db = $db->connect();
          $stmt = $db->query($sql);
          $data = $stmt->fetchAll(PDO::FETCH_OBJ);
          $db = null;
          $data = json_encode($data);

          $db = null;

          echo '{"notice": {"text": "Posts Retrieved"}, "success": "1", "posts": '.$data.'}';

      } catch (PDOException $e) {
        echo '{"notice": {"text": "Posts Not Retrieved"}, "success": "0"}';
      }
  } catch (PDOException $e) {
      echo '{"error":{"text": ' . $e->getMessage() . '}}';
  }

  return $response;
});

$app->post('/saveCoupon', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $code = $data['coupon']['code'];
    $off = $data['coupon']['off'];

    $sql = "INSERT INTO coupons (`code`,`off`) VALUES (:code,:off)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':off', $off);
        $stmt->execute();

        $db = null;
        $sql = "SELECT * FROM coupons";
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            $data = json_encode($data);

            $db = null;

            echo '{"notice": {"text": "Coupon Added"}, "success": "1", "coupons": '.$data.'}';

        } catch (PDOException $e) {
          echo '{"notice": {"text": "Coupon Not Added"}, "success": "0"}';
        }
    } catch (PDOException $e) {
      echo '{"notice": {"text": "Coupon Not Added"}, "success": "0"}';
    }

    return $response;
});

$app->get('/getCoupons', function (Request $request, Response $response, array $args) {

    $sql = "SELECT * FROM coupons";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($data);

        $db = null;

        echo '{"notice": {"text": "Coupons Retrieved"}, "success": "1", "coupons": '.$data.'}';

    } catch (PDOException $e) {
      echo '{"notice": {"text": "Coupons Not Retrieved"}, "success": "0"}';
    }

    return $response;
});

$app->post('/deleteCoupon', function (Request $request, Response $response, array $args) {
  $id = $request->getParam('id');
  $sql = "DELETE FROM coupons WHERE `id`=:id";
  try {
      $db = new db();
      $db = $db->connect();
      $stmt = $db->prepare($sql);
      $stmt->bindParam(':id', $id);
      $stmt->execute();

      $db = null;
      $sql = "SELECT * FROM coupons";
      try {
          $db = new db();
          $db = $db->connect();
          $stmt = $db->query($sql);
          $data = $stmt->fetchAll(PDO::FETCH_OBJ);
          $db = null;
          $data = json_encode($data);

          $db = null;

          echo '{"notice": {"text": "Coupons Retrieved"}, "success": "1", "coupons": '.$data.'}';

      } catch (PDOException $e) {
        echo '{"notice": {"text": "Coupons Not Retrieved"}, "success": "0"}';
      }
  } catch (PDOException $e) {
      echo '{"error":{"text": ' . $e->getMessage() . '}}';
  }

  return $response;
});

$app->post('/checkCoupon', function (Request $request, Response $response, array $args) {
  $code = $request->getParam('code');
  $sql = "SELECT off FROM coupons WHERE code='$code'";
  try {
      $db = new db();
      $db = $db->connect();
      $stmt = $db->query($sql);
      $data = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      $data = json_encode($data);

      echo '{"notice": {"text": "Coupon Valid"}, "success": "1", "off": '.$data.'}';

  } catch (PDOException $e) {
    echo '{"notice": {"text": "Coupon Invalid"}, "success": "0", "off": '.$data.'}';
  }

  return $response;
});

$app->post('/deleteCourse', function (Request $request, Response $response, array $args) {
  $data = json_decode($request->getParam('data'), true);
  $userIds = $data['userIds'];
  $userCourses = $data['userCourses'];
  $id = $data['cID'];
  $sql = "DELETE FROM courses WHERE `id`=:id";
  try {
      $db = new db();
      $db = $db->connect();
      $stmt = $db->prepare($sql);
      $stmt->bindParam(':id', $id);
      $stmt->execute();

      $db = null;
      $i = 0;
      foreach ($userIds as $uid) {
        $sql = "UPDATE users SET
            `coursesObj`=:cObj WHERE id=" . $uid;
        try {
          $courseObj = json_encode($userCourses[$i]);
          $db = new db();
          $db = $db->connect();
          $stmt = $db->prepare($sql);
          $stmt->bindParam(':cObj', $courseObj);
          $stmt->execute();

          $db = null;
          $i++;
        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }
      }
      echo '{"notice": {"text": "Course Deleted"}}';
  } catch (PDOException $e) {
      echo '{"error":{"text": ' . $e->getMessage() . '}}';
  }

  return $response;
});

$app->post('/updateCourse', function (Request $request, Response $response, array $args) {
    $data = json_decode($request->getParam('data'), true);
    $objMin = json_encode($data['objMin']);
    $objFull = json_encode($data['objFull']);
    $userIds = $data['userIds'];
    $userCourses = $data['userCourses'];
    $id = $data['id'];
    $sql = "UPDATE courses SET
        `objMin`=:objMin,
        `objFull`=:objFull WHERE id=" . $id;
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':objMin', $objMin);
        $stmt->bindParam(':objFull', $objFull);
        $stmt->execute();

        $db = null;
        $i = 0;
        foreach ($userIds as $uid) {
          $sql = "UPDATE users SET
              `coursesObj`=:cObj WHERE id=" . $uid;
          try {
            $courseObj = json_encode($userCourses[$i]);
            $db = new db();
            $db = $db->connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':cObj', $courseObj);
            $stmt->execute();

            $db = null;
            $i++;
          } catch (PDOException $e) {
              echo '{"error":{"text": ' . $e->getMessage() . '}}';
          }
        }
        echo '{"notice": {"text": "Course Updated"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
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


$app->run();
