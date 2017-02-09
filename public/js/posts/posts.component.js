(function (){
  angular.module("app")
  .component("posts", {
    templateUrl: "js/posts/posts.template.html",
    controller: PostController
  });

  PostController.$inject= ["$http"];
  function PostController ($http) {
    const vm = this;
    vm.submitPost = submitPost;
    vm.clearPostForm = clearPostForm;
    vm.deletePost = deletePost;
    vm.editPost = editPost;
    vm.sortSelect = sortSelect;

    vm.$onInit = function () {
      $http.get("/api/classifieds")
      .then(function (response){
        vm.posts = response.data;
      });
    }

    function submitPost () {
      $http.post("/api/classifieds", vm.post)
      .then(function (response){
        vm.posts.push(response.data);
        delete vm.post;
        clearPostForm();
      });
    }

    function clearPostForm () {
       vm.newPost = {};
       vm.postForm.$setPristine();
       vm.postForm.$setUntouched();
     }

    function deletePost (post) {
      event.preventDefault();
      $http.delete("api/classifieds/" + post.id)
      .then (function (response){
        function findPost (e) {
          return e.id == post.id;
        }
        let toDelete = vm.posts.findIndex(findPost);
        vm.posts.splice (toDelete, 1);
      });
    }

    function editPost (post) {
      event.preventDefault();
      vm.changePost = {};
      vm.changePost.id = post.id;
      vm.changePost.title = vm.post.newTitle;
      vm.changePost.description = vm.post.newDescription;
      vm.changePost.price = vm.post.newPrice;
      vm.changePost.item_image = vm.post.newItem_image;
      updatePost();
    }
    function updatePost () {
      $http.patch("/api/classifieds/" + vm.changePost.id,
      {
        title: vm.changePost.title,
        description: vm.changePost.description,
        price: vm.changePost.price,
        item_image: vm.changePost.item_image
      }
    )
    .then(function (response){
      let data = response.data;
      function findPost (e){
        return e.id == data.id;
      }
      let old = vm.posts.find(findPost);
      Object.assign(old, data);
      delete vm.changePost;
      delete vm.post;
    });
    }

    function sortSelect (sort){
      switch (sort) {
        case 'expensive':
          vm.sort = "-price";
          vm.sortDisplay ="Highest Price";
          break;
        case 'cheap':
          vm.sort = 'price';
          vm.sortDisplay = "Lowest Price";
          break;
        case 'new':
          vm.sort = '-created_at';
          vm.sortDisplay = "Newest Ads";
          break;
        case 'old':
          vm.sort = 'created_at';
          vm.sortDisplay = "Oldest Ads";
          break;
      }
    }
  }
})();
