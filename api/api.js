

const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/nadmin/kategoriler/${categoryId.toString()}`, { method: 'delete', headers: {"Content-type": "application/json"}})
      const data = await response.json();
        if (data.success) {
          alert('başarılı');
        } else {
          console.log('silme başarısız1')
        }
    } catch (err) {
 
    }
  }
  // google dan girin 2 dk google den nereye gircem hocam google mı açayım  heh tmm discordu açtım verin kullanıcı adınızı :D maybelatersource#0984 ☆ Can#8830
  //49141545 hocam yarın denesek ya bu terslik de bir iş var ama D:
  /// sorun ney hocam  ustam ne yaparsam yapayım şu hatayı alıyoru m
  // dc den ekran açar mısınız dc nedir discord475162795 any desk versem :D eskin hocam valla bunun icinde 8 9 saatir uğraşmayı geçtim konu bile açtım 3 forma 2dk nı almaz aslında :d discord kurayım ben istersen :d