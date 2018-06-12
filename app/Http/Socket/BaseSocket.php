<?
namespace App\Http\Socket;
use Illuminate\Support\Facades\Auth;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use App\FriendsRequest;
use App\Message;
use App\User;
use Carbon\Carbon;
use App\SocketInfo;
use DB;
class BaseSocket implements MessageComponentInterface {
    protected $clients;
    protected $ids=[];
public $entered=false;
    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $users=User::all();
        foreach ($users as $user) {
        array_push($this->ids, $user->id);
        }
    }

    public function onOpen(ConnectionInterface $conn) {
  
        $this->clients->attach($conn);

        echo 'new conn';


    }

    public function onMessage(ConnectionInterface $from, $message) {
        if(in_array($message, $this->ids)){
            $news_count=FriendsRequest::where('receiver_id','=',$message)->count();
            $message_count=Message::where(['to_id'=>$message,'viewed'=>0])->count();
            $count=json_encode(['message_count'=>$message_count,'news_count'=>$news_count]);
foreach ($this->clients as $client) {
            if ($from === $client) {
                $client->send($count);
            }
        }
        }else if($message==='entered'){
            $this->entered=true;
        }
        else if($message){
list($from_id,$to_id,$name,$to_name,$m)=json_decode($message);
$message_eloquent=new Message();
$message_eloquent->to_id=$to_id;
$message_eloquent->from_id=$from_id;
$message_eloquent->message=$m;
$message_eloquent->date=Carbon::now();
$message_eloquent->name=$name;
$message_eloquent->to_name=$to_name;
$message_eloquent->viewed=0;
$message_eloquent->save();
 DB::table('messages')->toSql(); 
foreach ($this->clients as $client) { 
                $client->send('update');
            
        }

        }
    }


    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
