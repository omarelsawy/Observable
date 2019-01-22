require('../css/style.css');
import $ from 'jquery';
import {Observable} from 'rxjs/Rx';

const input = $("#input");
const output = $("#output");
const inputStream$ = Observable.fromEvent(input, 'keyup');
inputStream$.subscribe((e, err)=> {
	output.append(e.target.value);
});
const moveStream$ = Observable.fromEvent(document, 'mousemove');
moveStream$.subscribe((e, err)=> {
	output.html('<h1>x: '+e.clientX+' y: '+e.clientY+'</h1>');
});

//observable from array
const posts = [
  {title: 'omar', body: 'ff'},
  {title: 'ali', body: 'ss'},
];
const posts$ = Observable.from(posts);
posts$.subscribe(
	(post)=> {
		$("#posts").append(`<li><h3>${post.title}</h3></li>`)
	},
	(err)=> {

	},
	(complete)=> {
      //console.log('completed');
	}
);

//observable from set
const set = new Set(['hello', 55, {title: "My Title"}]);
const set$ = Observable.from(set);
set$.subscribe(
	(v)=> {
		//console.log(v);
	},
	(err)=> {

	},
	(complete)=> {
      //console.log('completed');
	}
);

//observable from map
const map = new Map([[1,2], [3,4], [5,6]]);
const map$ = Observable.from(map);
map$.subscribe(
	(v)=> {
		//console.log(v);
	},
	(err)=> {

	},
	(complete)=> {
      //console.log('completed');
	}
);

//observable from scratch
/*const source$ = new Observable(observer=> {
   //console.log('create observable');
   observer.next('hello world');
   observer.next('another value');
   //observer.error(new Error('error'));
   throw new Error('error');
   setTimeout(()=> {
      //console.log('third value');
      observer.complete();
   } , 3000);
});
source$
.catch(err=> Observable.of(err))
.subscribe(
	(v)=> {
		//console.log(v);
	},
	(err)=> {
       //console.log(err);
	},
	(complete)=> {
      //console.log('completed');
	}
);*/

//observable from promise
const myPromise = new Promise((resolve, reject)=> {
	//console.log('creating promise');
	setTimeout(()=> {
       resolve('hello from promise');
	}, 3000);
});

/*myPromise.then(x=> {
  console.log(x);
});*/

const sourcePromise$ = Observable.fromPromise(myPromise);
sourcePromise$.subscribe(x=> {
	//console.log(x)
});

function getUser(username){
	return $.ajax({
       url: `https://api.github.com/users/${username}`,
       dataType: 'jsonp'
	}).promise();
}
Observable.fromPromise(getUser('omarelsawy'))
          .subscribe(x=> {
          	//console.log(x);
          });

//interval
/*const sourceInterval$ = Observable.interval(1000).take(5);
sourceInterval$.subscribe(
	(v)=> {
		console.log(v);
	},
	(err)=> {
       console.log(err);
	},
	(complete)=> {
      console.log('completed');
	}
);*/

//timer
/*const sourceTimer$ = Observable.timer(3000, 1000).take(5);
sourceTimer$.subscribe(
	(v)=> {
		console.log(v);
	},
	(err)=> {
       console.log(err);
	},
	(complete)=> {
      console.log('completed');
	}
);*/

//range all get emited at once 
/*const sourceRange$ = Observable.range(0, 5);
sourceRange$.subscribe(
	(v)=> {
		console.log(v);
	},
	(err)=> {
       console.log(err);
	},
	(complete)=> {
      console.log('completed');
	}
);*/

//map
/*const source$ = Observable.interval(1000)
                .take(5)
                .map(v=> v*2);
source$.subscribe(v=> console.log(v));*/

/*const source$ = Observable.from(['omar', 'ali'])
                .map(v=> v.toUpperCase())
                .map(v=> `iam ${v}`);
source$.subscribe(v=> console.log(v)); */

//pluck
/*const users = [
  {title: 'omar', body: 'ff'},
  {title: 'ali', body: 'ss'},
];
const users$ = Observable.from(users)
               .pluck('title');
users$.subscribe(user=> console.log(user));*/

//merge
//merge together and run on same time
/*Observable.of('hello')
          .merge(Observable.of('every one'))
          .subscribe(v=> console.log(v));*/

//concat
//concat together and not run on same time
/*Observable.range(0, 5)
          .map(v=> `src1 ${v}`)   
          .concat(Observable.range(5, 5).map(v=> `src2 ${v}`))
          .subscribe(v=> console.log(v));*/

//mergeMap
/*Observable.of('hello')
          .mergeMap(v=> {
          	return Observable.of(`${v} everyone`);
          })   
          .subscribe(v=> console.log(v));*/

/*switchMap dealling with inner observable 
when new value emited from outer one cancel inner observable and starts form begining*/
Observable.range(0, 1)
          .switchMap(v=> {
          	return Observable.range(5, 5);
          })   
          .subscribe(v=> console.log(v));

















