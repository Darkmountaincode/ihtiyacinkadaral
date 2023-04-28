

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
  
