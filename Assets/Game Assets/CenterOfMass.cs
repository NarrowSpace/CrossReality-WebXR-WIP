using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]
public class CenterOfMass : MonoBehaviour
{
    public Vector3 CenterOfMassPosition;
    public bool Awake;

    private Rigidbody r;

    // Called when the script is loaded or a value changes in the Inspector
    private void OnValidate()
    {
        // Ensure the Rigidbody component is assigned
        if (r == null)
        {
            r = GetComponent<Rigidbody>();
        }

        // Update the center of mass
        if (r != null)
        {
            r.centerOfMass = CenterOfMassPosition;
            r.WakeUp();
            Awake = !r.IsSleeping();
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        r = GetComponent<Rigidbody>();
        // Update the center of mass initially
        r.centerOfMass = CenterOfMassPosition;
    }

    // Update is called once per frame
    void Update()
    {
        r.centerOfMass = CenterOfMassPosition;
        r.WakeUp();
        Awake = !r.IsSleeping();
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawSphere(transform.position + transform.rotation * CenterOfMassPosition, 0.5f);
    }
}
