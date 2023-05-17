import Eval from '../object/Eval';
import PostMessage from '../object/PostMessage';

export default function MemberExpression(node: any, parent: any = {}, config: any = {}) {
    /*if (config.destination !== 'worker') if (node.object.type!=='Identifier' && !node.object.__dynamic) {
      if (node.object.type == 'MemberExpression') return node.object = {
        type: 'CallExpression',
        callee: {type: 'Identifier', name: 'dg$'},
        arguments: [node.object],
        __dynamic: true
      }
    }

    if (config.destination !== 'worker') if (node.object.type=='Identifier' && !(parent.type == "CallExpression" && parent.callee.name == "__dynamic$get" && !node.object.__dynamic)) {
      node.object = {
        type: 'CallExpression',
        callee: {type: 'Identifier', name: 'dg$'},
        arguments: [node.object],
        __dynamic: true
      }

      return;
    }*/

    node.object.name+='';

    if (parent.type!=='AssignmentExpression'&&parent.left!==node) {
      if (node.property.value == 'postMessage' && (parent.type=='CallExpression'&&parent.callee==node)) return PostMessage(node, parent);
      if (node.object.value == 'postMessage' && (parent.type=='CallExpression'&&parent.callee==node)) return PostMessage(node, parent);

      if (node.property.name=='postMessage'||node.object.name=='postMessage') {
        var original:string = node.object?.name
        node.type = 'CallExpression';
        node.callee = {type: 'Identifier', name: '__dynamic$message'}
        node.arguments = [{type: 'Identifier', name: original}, {type: 'Identifier', name: 'self', __dynamic: true}]
        if (parent=='CallExpression') {
          parent.arguments = parent.arguments
        }

        return;
      }
    }

    if (node.property.name=='eval') node.property.name = '__dynamic$eval';
    if (node.object.name=='eval') node.object.name = '__dynamic$eval';

    if (config.destination!=='worker') {
      if (node.property.name=='window'&&node.object.name!='top'&&(node.object.name=='self'||node.object.name=='globalThis')) if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.property.name = '__dynamic$window';
      if (node.object.name=='top') if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.object.name = 'top.__dynamic$window';
      if (node.property.name=='top'&&(node.object.name=='self'||node.object.name=='globalThis')) if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.property.name = 'top.__dynamic$window';
      if (node.object.name=='window') {
        if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.object.name = 'self.__dynamic$window';
      };
      if (node.object.name=='parent') {
        if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.object.name = 'self.parent.__dynamic$window';
      };
      if (node.property.name == '__dynamic') node.property.name = 'undefined';
      if (node.object.name=='self') {
        if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.object.name = 'self.__dynamic$window';
      };
      if (node.object.name=='document') {
        if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.object.name = 'self.__dynamic$document';
      };
      if (node.object.name=='globalThis') {
        if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.object.name = 'self.__dynamic$window';
      };
      if (node.object.name=='location') {
        node.object = {
          type: 'CallExpression',
          callee: {type: 'Identifier', name: 'dg$'},
          arguments: [node.object],
          __dynamic: true
        }
      };
      if (node.property.name=='location' && parent.type !== "BinaryExpression" && parent.type !== "AssignmentExpression") {
        node.property.__dynamic = true;

        node.__dynamic = true;
        let original: any = Object.assign({}, node);

        node.type = "CallExpression";
        node.callee = {type: 'Identifier', name: 'dg$'};
        node.arguments = [original];
      }
    }

    //if (!['self', 'globalThis'].includes(node.object.name)) return false;

    //if (parent.type=='CallExpression'&&parent.callee==node) return;

    //if (node.object.name=='document') return node.object.name = `d$g_(${node.object.name})`;

    //return node.object.name = '__dynamic$'+node.object.name;
}