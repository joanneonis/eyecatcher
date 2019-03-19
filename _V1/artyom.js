const artyom = new Artyom();

			artyom.initialize({
				continuous:true,
				lang:"nl-NL",
				executionKeyword: "and do it now",
				listen:true,
				debug:true
			});

			console.log("test", artyom);

			function test() {
				artyom.say("Ik ben nederlands",{
					onStart:function(){
							console.log("Start tekst voorlezen");
					},
					onEnd:function(){
							console.log("Tekst gelezen!");
					}
				});
			}

		document.getElementById("btn").addEventListener("click", test);